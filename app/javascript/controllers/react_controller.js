import { Controller } from "@hotwired/stimulus";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../components/App";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    console.log("ReactController#connect");
    const app = document.getElementById("app");
    createRoot(app).render(
    <App />
    );
  }
}