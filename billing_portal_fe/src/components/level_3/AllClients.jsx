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
import CreateClient from "../level_2/CreateClient";

export default function AllClient() {
  const [clientList, setClientList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [descriptions, setDescriptions] = useState({}); // Map of panel IDs to descriptions

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (panel, id) => async (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (!isExpanded || descriptions[id]) return; // Avoid re-fetching if already loaded
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/${id}/`,
        {
          withCredentials: true,
        }
      );
      setDescriptions((prev) => ({
        ...prev,
        [id]: {
          name: response.data.name,
          gst_number: response.data.gst_number,
          contact_number: response.data.contact_number,
          email: response.data.email,
          address: response.data.address,
          total_spend: response.data.total_spend,
          users_name: response.data.user.name,
          users_email: response.data.user.email,
          contact_number: response.data.user.contact_number,
        }, // Store the description as an object instead of an array of objects
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/clients/`,
          {
            withCredentials: true,
          }
        );
        setClientList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full border-2 border-black rounded-md shadow-2xl">
      {clientList?.map((item, index) => (
        <>
          <Accordion
            className="w-full bg-[#1b1b1d] text-white "
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
              <Typography
                component="span"
                sx={{ width: "5%", fontWeight: "bold" }}
              >
                {index + 1}
              </Typography>
              <Typography
                component="span"
                sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
              >
                {item?.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ display: "flex", flexDirection: "column" }}>
                <div className="flex justify-around">
                  {[
                    {
                      title: "Company's Detail",
                      details: [
                        {
                          label: "Name",
                          value: descriptions[item.id]?.name,
                        },
                        {
                          label: "GST Number",
                          value: descriptions[item.id]?.gst_number,
                        },
                        {
                          label: "Contact Number",
                          value: descriptions[item.id]?.contact_number,
                        },
                        { label: "Email", value: descriptions[item.id]?.email },
                        {
                          label: "Address",
                          value: `${
                            descriptions[item.id]?.address?.line1 || ""
                          }, 
                                  ${
                                    descriptions[item.id]?.address?.line2 || ""
                                  },
                                  ${descriptions[item.id]?.address?.city || ""},
                                  ${
                                    descriptions[item.id]?.address?.state || ""
                                  },
                                  ${
                                    descriptions[item.id]?.address?.district ||
                                    ""
                                  },
                                  ${
                                    descriptions[item.id]?.address?.pincode ||
                                    ""
                                  }`,
                        },
                        {
                          label: "Total Spend",
                          value: descriptions[item.id]?.total_spend,
                        },
                      ],
                    },
                    {
                      title: "Client's Detail",
                      details: [
                        {
                          label: "Name",
                          value: descriptions[item.id]?.users_name,
                        },
                        {
                          label: "Email",
                          value: descriptions[item.id]?.users_email,
                        },
                        {
                          label: "Contact Number",
                          value: descriptions[item.id]?.contact_number,
                        },
                      ],
                    },
                  ].map((section, index) => (
                    <div key={index} style={{ width: "45%" }}>
                      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                        {section.title}:
                      </p>
                      <hr style={{ marginBottom: "5px" }} />
                      {section.details.map(({ label, value }) => (
                        <p key={label} style={{ fontWeight: "bold" }}>
                          {label}:{" "}
                          <span style={{ fontWeight: "normal" }}>
                            {value || "N/A"}
                          </span>
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      ))}

      <div className="mt-4 h-[3rem]">
        <CustomButton
          sx={{ backgroundColor: "#1b1b1d", color: "white" }}
          onClick={handleOpen}
        >
          Add new client
        </CustomButton>
      </div>
      <CreateClient open={open} handleClose={handleClose} />
    </div>
  );
}
