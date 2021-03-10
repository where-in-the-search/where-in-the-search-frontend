import { render, screen } from '@testing-library/react';
import App from './App';
import { getRandomInRange, generateMapCoordinates, getRandomIdOrder } from './Utils/Game-Utils.js';

test('returns a random coordinate', async () => {

  const actual = getRandomInRange(-90, 90, 4);

  expect(typeof actual === 'number').toEqual(true);
  expect(actual <= 90).toEqual(true);
  expect(actual >= -90).toEqual(true);
  expect(Number(actual.toFixed(4))).toEqual(actual);
});

test('returns a random set of latitude and longitude coordinates', async () => {
  const actual = generateMapCoordinates();

  expect(typeof actual === 'object').toEqual(true);
  expect(actual.hasOwnProperty('mapLat')).toEqual(true);
  expect(actual.hasOwnProperty('mapLon')).toEqual(true);

  expect(actual.mapLat >= -90).toEqual(true);
  expect(actual.mapLat <= 90).toEqual(true);
  expect(actual.mapLon >= -180).toEqual(true);
  expect(actual.mapLon <= 180).toEqual(true);

  expect({
    'mapLat': Number(actual.mapLat.toFixed(4)),
    'mapLon': Number(actual.mapLon.toFixed(4))
  }).toEqual(actual);
});

test('returns an array of 5 unique numbers between 1 and 100', () => {
  const actual = getRandomIdOrder();

  expect(Array.isArray(actual)).toEqual(true);
  expect(actual.length).toEqual(5);
  expect(actual.every(i => i >= 1 && i <= 100)).toEqual(true);
  expect(actual.every(i => typeof i === 'number')).toEqual(true);
  expect(actual.reduce((a, b) => a !== b)).toEqual(true);
});