"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomButton from "../level_1/CustomButton";

export default function ViewServices({ onClick }) {
  const [serviceList, setServiceList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [descriptions, setDescriptions] = useState({}); // Map of panel IDs to descriptions

  const handleChange = (panel, id) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (!isExpanded || descriptions[id]) return; // Avoid re-fetching if already loaded
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/${id}/`,
        {
          withCredentials: true,
        }
      );
      setDescriptions((prev) => ({
        ...prev,
        [id]: response.data.description, // Store the description for the specific panel
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      console.errors("Failed to fetch data. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/services/`,
          {
            withCredentials: true,
          }
        );
        setServiceList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-[50vw] border-2 border-black p-10 rounded-md shadow-2xl">
      {serviceList?.map((item, index) => (
        <>
          <Accordion
            className="w-full "
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`, item.id)}
          >
            <AccordionSummary
              className="w-full h-[5rem]"
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="span" sx={{ width: "5%" }}>
                {index + 1}
              </Typography>
              <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
                {item?.name}
              </Typography>
              <Typography component="span" sx={{ color: "black" }}>
                Rs.{item?.cost}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {descriptions[item.id] || "Loading description..."}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}

      <div className="mt-4 h-[3rem]">
        <CustomButton
          sx={{ backgroundColor: "black", color: "white" }}
          onClick={onClick}
        >
          Create New Service
        </CustomButton>
      </div>
    </div>
  );
}
