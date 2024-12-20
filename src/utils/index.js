#!/usr/bin/env node
/*
 *
 *      Utils
 *      --------------------
 *      Code to generate badges to README.md
 *
 *      by: Maria Luísa
 *          https://malu.dev
 *          https://github.com/@marialuiscp
 */

const fs = require('fs');
const path = require('path');

const getColor = (value, colors) =>
  value > 80 ? colors.green : value >= 50 ? colors.yellow : colors.red;

const generateBadge = async ({
  data,
  label,
  value,
  colors,
  badgesValues,
  folderToSave,
}) => {
  let newData = data
    .replace(/_WIDTH_/gim, badgesValues[label].width)
    .replace(/_LABEL_/gim, label.toUpperCase())
    .replace(/_VALUE_/gim, value)
    .replace(/_COLOR_/gim, getColor(value, colors));
  fs.writeFileSync(`./${folderToSave}/${label}.svg`, newData, 'utf-8');
};

const getCoverage = (total, covered) => (covered / total) * 100;

const getFormattedCoverage = (type, coverage) =>
  Math.trunc(getCoverage(coverage[type].total, coverage[type].covered));

const createFolder = (folderName, parentPath) => {
  const folderPath = path.join(parentPath, folderName);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const generateChart = async ({ data, label, value, colors, folderToSave }) => {
  const chartSize = 263.76;
  const exactValue = chartSize - (value * chartSize) / 100;

  let newData = data
    .replace(/_LABEL_/gim, label.toUpperCase())
    .replace(/_VALUE_COV_/gim, value)
    .replace(/_CHART_SIZE_/gim, chartSize)
    .replace(/_EXACT_VALUE_/gim, exactValue)
    .replace(/_COLOR_/gim, getColor(value, colors));
  fs.writeFileSync(`./${folderToSave}/${label}_chart.svg`, newData, 'utf-8');
};

module.exports = {
  getColor,
  generateBadge,
  getCoverage,
  getFormattedCoverage,
  createFolder,
  generateChart,
};
