import "./App.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Material Ui Components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// External Libraries
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./weatherApiSlice";

moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});


export default function App() {
  // Redux Code
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });

  const temp = useSelector((state) => {
    return state.weather.weather;
  });

  const { t, i18n } = useTranslation();

  // States
  const [dateAndTime, setDateAndTime] = useState("");
  const [locale, setLocale] = useState("ar");

  const direction = locale === "en" ? "ltr" : "rtl";

  // Event Handlers
  function handleLanguage() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
      setDateAndTime(moment().format("MMM Do YYYY"));
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
      setDateAndTime(moment().format("MMM Do YYYY"));
    }
  }
  useEffect(() => {
    dispatch(fetchWeather());
    i18n.changeLanguage(locale);
  }, []);
  useEffect(() => {
    setDateAndTime(moment().format("MMM Do YYYY"));
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* Content Container */}
          <div style={{ minHeight: "100svh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" }}>
            {/* Card */}
            <div
              dir={direction}
              style={{
                width: "100%",
                background: "rgb(28 52 91 / 35%)",
                color: "white",
                padding: "10px",
                borderRadius: "15px",
                boxShadow: "rgb(0 0 0 / 10%) 0px 10px 13px 0px",
              }}
            >
              {/* Content */}
              <div>
                {/* City & Time */}
                <div style={{ display: "flex", alignItems: "end", gap: "25px" }}>
                  <Typography
                    className="cityName"
                    variant="h2"
                    sx={{
                      marginLeft: locale === "en" ? "25px" : "0",
                      marginRight: locale === "en" ? "0" : "25px",
                      marginBlock: "0",
                      fontWeight: "600",
                    }}
                  >
                    {t("Riyadh")}
                  </Typography>
                  <Typography className="time" variant="h5">
                    {dateAndTime}
                  </Typography>
                </div>
                {/* === City & Time === */}

                <hr />
                {/* Container Of Degree + Cloud Icon */}
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  {/* Degree & Description */}
                  <div>
                    {/* Temp */}
                    <div dir={direction} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      {isLoading ? <CircularProgress style={{ color: "white" }} /> : ""}
                      <Typography className="degree" variant="h1">
                        {temp.number}
                      </Typography>
                      <img src={temp.icon} alt="" />
                    </div>
                    {/* === Temp === */}
                    <Typography variant="h6" sx={{ fontWeight: "300", fontSize: "22px", marginBottom: "10px !important" }}>
                      {t(temp.description)}
                    </Typography>
                    {/* Min & Max */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
                      <Typography className="minMax" variant="h6" sx={{ fontSize: "1.05rem" }}>
                        {t("min")}: {temp.min}
                      </Typography>
                      <Typography className="minMax" variant="h6" sx={{ fontSize: "1.05rem" }}>
                        |
                      </Typography>
                      <Typography className="minMax" variant="h6" sx={{ fontSize: "1.05rem" }}>
                        {t("max")}: {temp.max}
                      </Typography>
                    </div>
                    {/* === Min & Max === */}
                  </div>
                  {/* === Degree & Description === */}
                  <CloudIcon className="cloudIcon" style={{ fontSize: "200px", color: "white" }} />
                </div>
                {/* === Container Of Degree + Cloud Icon === */}
              </div>
              {/* === Content === */}
            </div>
            {/* === Card === */}
            {/* Translation Container */}
            <div dir={direction} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
              <Button variant="text" sx={{ color: "white" }} onClick={handleLanguage}>
                {locale === "en" ? "Arabic".toLowerCase() : "انجليزي"}
              </Button>
            </div>
            {/* === Translation Container === */}
          </div>
          {/* === Content Container === */}
        </Container>
      </ThemeProvider>
    </div>
  );
}
