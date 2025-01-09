import "../styles/components/ActiveNote.css";
import React, { act, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from "quill";
import { useRef, useEffect } from "react";
import '../styles/views/TextEditor.css'; // Import Quill's styling.
import Editor from "quill/core/editor";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ActiveNote({activeNote, handleNoteTitleUpdate, handleNoteUpdate}){
    // Handle URL querying
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get("userEmail");
    const notebook_id = queryParams.get("notebook_id");
    const note_id = queryParams.get("note_id");

    const handleTitleChange = async(value) =>{
        if (activeNote.title !== value) {
            handleNoteTitleUpdate(activeNote.note_id, value)
            const putData = {
                title: value,
                userEmail: userEmail,
                notebook_id: notebook_id,
                note_id: note_id
            };
            await axios.put('http://localhost:4000/updateNoteTitle', putData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    const handleNoteChange = async (value) => {
        if (activeNote.content !== value) {
            handleNoteUpdate(activeNote.note_id, value); // Only call the update handler if content changes.
            const putData = {
                noteContent: value,
                userEmail: userEmail,
                notebook_id: notebook_id,
                note_id: note_id
            }; 
            await axios.put('http://localhost:4000/updateNote', putData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
    if (activeNote){
        return(
            <div className="test">
                <div className="active-note-heading">
                    <input type="text" id="note-title-input"
                        value={activeNote.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Untitled"
                    />
                    <div className="active-note-subheader">
                        {activeNote.date}
                    </div>
                </div>

                <div className="active-note-content">
                    <ReactQuill /* Do not give this an id otherwise the onChange stops working. */
                        key={activeNote.note_id} // If the note_id changes, then forces Quill to re-render.
                        value={activeNote.content}
                        onChange={handleNoteChange}
                        theme="snow"
                    />
                </div>
            </div>
        )
    }
    else{
        return( /* Return an empty page if no note is selected. */
            <>

            </>
        )
    }

}

export default ActiveNote;
