import React, { useState, useEffect } from "react";
import "../styles/ControlBox.css";
import Exhibit from "./Exhibit";

const ControlBox = ({ onChangeLevel, onLanguageSelect}) => {
  const [level, setLevel] = useState("beginner");
  const [selectedLang, setSelectedLang] = useState("en-US");
  const [setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices and set the default voice based on selected language
  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);

      const defaultVoice = availableVoices.find((voice) => voice.lang === selectedLang);
      setSelectedVoice(defaultVoice);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, [selectedLang, setVoices]);

  const sendSettingsToBackend = async (level, language) => {
    try {
      console.log("Payload sent to backend:", { level, language }); // Debugging
  
      const response = await fetch("http://127.0.0.1:8000/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, language }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to send settings: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Backend response:", data); // Debugging
    } catch (error) {
      console.error("Error sending settings to backend:", error);
    }
  };

  const handleAgeLevelChange = (e) => {
    const newLevel = e.target.value;
    setLevel(newLevel);
    onChangeLevel(newLevel);

    // Send updated settings to the backend
    sendSettingsToBackend(newLevel, selectedLang);
  };

  const handleLanguageSelect = (e) => {
    const newLanguage = e.target.value;
    setSelectedLang(newLanguage);
    onLanguageSelect(newLanguage);

    // Send updated settings to the backend
    sendSettingsToBackend(level, newLanguage);
  };

  // TTS function to be passed as a prop
  const handleTTSClick = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLang; // Set the language based on user selection
    utterance.voice = selectedVoice; // Set the selected voice
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="control-box">
      <div className="control">
        <label>Reading Level</label>
        <select value={level} onChange={handleAgeLevelChange}>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div className="control">
        <label>Select Language</label>
        <select value={selectedLang} onChange={handleLanguageSelect}>
          <option value="en-US">English</option>
          <option value="es-MX">Español</option>
          <option value="fr-FR">Français</option>
          <option value="de-DE">Deutsch</option>
          <option value="zh-CN">中文 (Mandarin)</option>
          <option value="pt-PT">Português</option>
          <option value="it-IT">Italiano</option>
        </select>
      </div>

      {/* Only one instance of Exhibit should be rendered */}
      <Exhibit level={level} handleTTSClick={handleTTSClick} />
    </div>
  );
};

export default ControlBox;
