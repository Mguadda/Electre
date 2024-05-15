import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Slider,
  Checkbox,
  Button,
  Paper,
  Typography,
  Box,
  FormControlLabel,
  Alert,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import jsFileDownload from "js-file-download";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import NormalizedTable from "./NormalizedTable";
import ScoreTable from "./ScoreTable";
import Navbar from "./Navbar";
function CriteriaTable() {
  const ratingStyles = {
    1: { color: "#cc0000" },
    2: { color: "#e65c00" },
    3: { color: "#cccc00" },
    4: { color: "#66cc00" },
    5: { color: "#009900" },
  };
  const [normalizedTables, setNormalizedTables] = useState([]);
  const [scoreTable, setScoreTable] = useState();
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Platform 1",
      usability: 3,
      support: 3,
      price: "",
      displayQuality: 3,
      contentAvailability: 3,
    },
  ]);
  const [criteriaWeights, setCriteriaWeights] = useState({
    usability: 20,
    support: 20,
    price: 20,
    displayQuality: 20,
    contentAvailability: 20,
  });
  const [criteriaBeneficial, setCriteriaBeneficial] = useState({
    usability: false,
    support: false,
    price: false,
    displayQuality: false,
    contentAvailability: false,
  });
  const [error, setError] = useState("");

  const handleSliderChange = (index, field, value) => {
    const newRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleWeightChange = (field, value) => {
    setCriteriaWeights((prev) => ({ ...prev, [field]: value }));
  };

  const handleCriteriaChange = (field) => {
    setCriteriaBeneficial((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      name: `Platform ${rows.length + 1}`,
      usability: 3,
      support: 3,
      price: "",
      displayQuality: 3,
      contentAvailability: 3,
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index));
    }
  };

  const validateWeights = () => {
    const totalWeight = Object.values(criteriaWeights).reduce(
      (acc, value) => acc + parseFloat(value),
      0
    );
    return totalWeight === 100;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateWeights()) {
      const formData = {
        rows,
        criteriaWeights,
        criteriaBeneficial,
      };

      const url = "http://localhost:5000/electre";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          setNormalizedTables([result.normalized_data]);
          setScoreTable(result.scores);
          console.log("Response from the backend:", result);
        } else {
          throw new Error("Failed to fetch data from the backend");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError("Failed to send data to the backend. Please try again.");
      }
    } else {
      setError("The sum of all criteria weights must equal 100%.");
    }
  };
  const handleDownloadData = () => {
    const dataToDownload = {
      normalizedTables,
      scoreTable,
    };
    jsFileDownload(JSON.stringify(dataToDownload, null, 4), "tables-data.json");
  };

  const handlePrintScoreTable = () => {
    html2canvas(document.querySelector("#tablesContainer")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("tables.pdf");
    });
  };

  return (
    <>
    <Navbar/>
      <Paper sx={{ margin: 3, padding: 3 }}>
        <Typography variant="h4" textAlign="center" color="primary">
          Electre AR Platforms
        </Typography>
        <Typography variant="body2" sx={{ margin: 2 }}>
          Check the beneficial criteria checkboxes to designate which criteria
          are advantageous for decision-making. Ensure that the total weight of
          all criteria equals 100%.
        </Typography>
        <Paper sx={{ margin: 2, padding: 2, backgroundColor: "#f7f7f7" }}>
          <Typography variant="h6" textAlign="center">
            Rating Scale
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Typography sx={ratingStyles[1]} textAlign="center">
                1 - Low
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={ratingStyles[2]} textAlign="center">
                2 - Below Average
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={ratingStyles[3]} textAlign="center">
                3 - Average
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={ratingStyles[4]} textAlign="center">
                4 - Good
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={ratingStyles[5]} textAlign="center">
                5 - Excellent
              </Typography>
            </Grid>
          </Grid>
        </Paper>
        <form onSubmit={handleSubmit}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Criteria</TableCell>
                  <TableCell>
                    <TextField
                      label="Weight (%) for Usability"
                      type="number"
                      value={criteriaWeights.usability}
                      onChange={(e) =>
                        handleWeightChange(
                          "usability",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteriaBeneficial.usability}
                          onChange={() => handleCriteriaChange("usability")}
                          color="primary"
                        />
                      }
                      label="Usability (1-5)"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Weight (%) for Support"
                      type="number"
                      value={criteriaWeights.support}
                      onChange={(e) =>
                        handleWeightChange("support", parseInt(e.target.value))
                      }
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteriaBeneficial.support}
                          onChange={() => handleCriteriaChange("support")}
                          color="primary"
                        />
                      }
                      label="Customer Support (1-5)"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Weight (%) for Price"
                      type="number"
                      value={criteriaWeights.price}
                      onChange={(e) =>
                        handleWeightChange("price", parseInt(e.target.value))
                      }
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteriaBeneficial.price}
                          onChange={() => handleCriteriaChange("price")}
                          color="primary"
                        />
                      }
                      label="Price"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Weight (%) for Display Quality"
                      type="number"
                      value={criteriaWeights.displayQuality}
                      onChange={(e) =>
                        handleWeightChange(
                          "displayQuality",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteriaBeneficial.displayQuality}
                          onChange={() =>
                            handleCriteriaChange("displayQuality")
                          }
                          color="primary"
                        />
                      }
                      label="Display Quality (1-5)"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Weight (%) for Content Availability"
                      type="number"
                      value={criteriaWeights.contentAvailability}
                      onChange={(e) =>
                        handleWeightChange(
                          "contentAvailability",
                          parseInt(e.target.value)
                        )
                      }
                      InputProps={{ inputProps: { min: 0, max: 100 } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={criteriaBeneficial.contentAvailability}
                          onChange={() =>
                            handleCriteriaChange("contentAvailability")
                          }
                          color="primary"
                        />
                      }
                      label="Content Availability (1-5)"
                    />
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <TextField
                        value={row.name}
                        onChange={(e) =>
                          handleInputChange(index, "name", e.target.value)
                        }
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Slider
                        value={row.usability}
                        onChange={(e, newValue) =>
                          handleSliderChange(index, "usability", newValue)
                        }
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                      />
                    </TableCell>
                    <TableCell>
                      <Slider
                        value={row.support}
                        onChange={(e, newValue) =>
                          handleSliderChange(index, "support", newValue)
                        }
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={row.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <Slider
                        value={row.displayQuality}
                        onChange={(e, newValue) =>
                          handleSliderChange(index, "displayQuality", newValue)
                        }
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                      />
                    </TableCell>
                    <TableCell>
                      <Slider
                        value={row.contentAvailability}
                        onChange={(e, newValue) =>
                          handleSliderChange(
                            index,
                            "contentAvailability",
                            newValue
                          )
                        }
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => deleteRow(index)}
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box textAlign="center" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
            >
              Submit Data
            </Button>
            <Button
              onClick={addRow}
              variant="outlined"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ ml: 2 }}
            >
              Add Row
            </Button>
          </Box>
        </form>
        {normalizedTables.length > 0 && scoreTable && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Box
              id="tablesContainer"
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <Card sx={{ minWidth: 300, m: 1 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Normalized Data
                  </Typography>
                  {normalizedTables.map((data, index) => (
                    <NormalizedTable key={index} data={data} />
                  ))}
                </CardContent>
              </Card>
              <Card sx={{ minWidth: 300, m: 1 }}>
                <CardContent>
                  <Typography variant="h6" color="primary">
                    Score Table
                  </Typography>
                  <div id="scoreTable">
                    <ScoreTable data={scoreTable} />
                  </div>
                </CardContent>
              </Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                mt: 2,
              }}
            >
              <Button
                startIcon={<DownloadIcon />}
                onClick={handleDownloadData}
                variant="outlined"
                sx={{ mr: 2 }}
              >
                Download Data
              </Button>
              <Button
                startIcon={<PrintIcon />}
                onClick={handlePrintScoreTable}
                variant="outlined"
              >
                Print as PDF
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </>
  );
}

export default CriteriaTable;
