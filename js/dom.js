/*
 * File: c:\Users\tonyw\Desktop\git-components\iot-components\scripts\dom.js
 * Project: c:\Users\tonyw\Desktop\git-components\iot-components\scripts
 * Created Date: Saturday October 21st 2023
 * Author: Tony Wiedman
 * -----
 * Last Modified: Sat October 21st 2023 3:00:49 
 * Modified By: Tony Wiedman
 * -----
 * Copyright (c) 2023 MolexWorks / Tone Web Design
 */


/**
 * Returns the DOM element with the given ID.
 * @param {string} id - The ID of the desired DOM element.
 * @return {Element|null} - The DOM element or null if not found.
 */
const Id = id => document.getElementById(id) || null;

/**
 * Returns the first DOM element with the given class name.
 * @param {string} className - The class name of the desired DOM element.
 * @return {Element|null} - The DOM element or null if not found.
 */
const Class = className => document.querySelector(`.${className}`) || null;

/**
 * Returns all DOM elements with the given class name.
 * @param {string} className - The class name of the desired DOM elements.
 * @return {Array} - An array of DOM elements.
 */
const Classes = className => Array.from(document.getElementsByClassName(className));

/**
 * Returns all child elements of the DOM element with the given ID.
 * @param {string} parentId - The ID of the parent DOM element.
 * @return {Array} - An array of child DOM elements.
 */
const Children = parentId => {
    const parentElement = Id(parentId);
    return parentElement ? Array.from(parentElement.children) : [];
};
