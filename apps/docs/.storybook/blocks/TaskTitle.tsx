import React from 'react';

const LinkSVG = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.841 2.159a2.25 2.25 0 00-3.182 0l-2.5 2.5a2.25 2.25 0 000 3.182.5.5 0 01-.707.707 3.25 3.25 0 010-4.596l2.5-2.5a3.25 3.25 0 014.596 4.596l-2.063 2.063a4.27 4.27 0 00-.094-1.32l1.45-1.45a2.25 2.25 0 000-3.182z"
      fill="currentColor"></path>
    <path
      d="M3.61 7.21c-.1-.434-.132-.88-.095-1.321L1.452 7.952a3.25 3.25 0 104.596 4.596l2.5-2.5a3.25 3.25 0 000-4.596.5.5 0 00-.707.707 2.25 2.25 0 010 3.182l-2.5 2.5A2.25 2.25 0 112.159 8.66l1.45-1.45z"
      fill="currentColor"></path>
  </svg>
);

const TaskTitle = ({ text, timebox }) => (
  <h2
    id={text.toLowerCase().replaceAll(' ', '-')}
    className="css-wzniqs"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
    <a
      aria-hidden="true"
      href={`#${text.toLowerCase().replaceAll(' ', '-')}`}
      tabIndex={-1}
      target="_self"
      className="css-1ofkq6d"
      style={{ position: 'absolute' }}>
      <LinkSVG />
    </a>
    {text} <span style={{ float: 'right' }}>{timebox}</span>
  </h2>
);

export default TaskTitle;
