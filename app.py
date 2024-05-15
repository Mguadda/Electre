from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)#bach n7elo error dyal cors

def round_recursive(item, places):#kheli ghir joj ar9am wra fassila
    if isinstance(item, dict):
        return {k: round_recursive(v, places) for k, v in item.items()}
    elif isinstance(item, list):
        return [round_recursive(v, places) for v in item]
    elif isinstance(item, float):
        return round(item, places)
    return item
def normalize_data(alternatives, criteria_beneficial, criteria_weights):#step1 normalize tables
    criteria_max = {criterion: max(alternative[criterion] for alternative in alternatives) for criterion in alternatives[0] if criterion not in ['id', 'name']}
    criteria_min = {criterion: min(alternative[criterion] for alternative in alternatives) for criterion in alternatives[0] if criterion not in ['id', 'name']}
    normalized_data = []
    for alt in alternatives:
        normalized_alternative = {'id': alt['id'], 'name': alt['name']}
        for criterion in [c for c in alt if c not in ['id', 'name']]:
            value = float(alt[criterion])
            if criteria_beneficial[criterion]:
                normalized_alternative[criterion] = float(value) / float(criteria_max[criterion])
            else:
                normalized_alternative[criterion] = float(criteria_min[criterion]) / float(value)
        normalized_data.append(normalized_alternative)
    return normalized_data

def calculate_scores_and_rankings(normalized_data, criteria_weights):#step2 7sb score w ranking
    # hseb score
    scores = []
    for alt in normalized_data:
        score = sum(alt[criterion] * criteria_weights[criterion] / 100 for criterion in criteria_weights if criterion in alt)
        scores.append({'id': alt['id'], 'name': alt['name'], 'score': score})
    
    #trtib 3la hsab score
    ranked_scores = sorted(scores, key=lambda x: x['score'], reverse=True)
    for idx, score in enumerate(ranked_scores):
        score['rank'] = idx + 1
    
    return scores, ranked_scores

@app.route('/electre', methods=['POST'])#endpoint dial api
def electre():
    data = request.get_json()
    alternatives = data['rows']
    criteria_weights = {key: float(val) for key, val in data['criteriaWeights'].items()}
    criteria_beneficial = data['criteriaBeneficial']

    normalized_data = normalize_data(alternatives, criteria_beneficial, criteria_weights)
    scores, rankings = calculate_scores_and_rankings(normalized_data, criteria_weights)

    rounded_normalized_data = round_recursive(normalized_data, 2)
    rounded_scores = round_recursive(scores, 2)
    return jsonify({'normalized_data': rounded_normalized_data, 'scores': rounded_scores, 'rankings': rankings})

if __name__ == '__main__':
    app.run(debug=True)
