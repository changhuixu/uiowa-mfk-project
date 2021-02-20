# UIowa Mfk

[![Build Status](https://img.shields.io/travis/changhuixu/uiowa-mfk-project/master.svg?label=Travis%20CI&style=flat-square)](https://travis-ci.org/changhuixu/uiowa-mfk-project)
[![npm](https://img.shields.io/npm/v/@uiowa/uiowa-mfk.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/uiowa-mfk)

`uiowa-mfk` is a full-fledged Angular library for MFK input. Based on this library, the demo app shows some common configurations of MFK inputs, validations, and Favorite MFK management. This library has peer dependency on Angular >=10, Bootstrap 4.5 (css) and @uiowa/digit-only, as of Nov, 2020. The version number of this library is following the major and minor version of Angular.

## [Demo](https://uiowa-mfk.firebaseapp.com)

## Features

- `uiowa-mfk-input`

  1. Number only input fields with fixed lengths.
  1. Smartly handle paste strings for input fields.
  1. Auto fill 0s in the MFK input field when hit <kbd>Tab</kbd> key.
  1. Auto focus next fields when current MFK input field is full.
  1. Allow set field(s) default value(s).
  1. Allow set readonly field(s).
  1. Provide MFK common methods.
  1. Provide MFK validation method and service.
  1. Provide MFK change event API.

- `uiowa-favorite-mfk`

  1. Select Favorite MFK and show it in MFK input.
  1. Clear MFK input.
  1. Real-time indication for determine if an MFK is "favorite" or not.
  1. Add/Remove Favorite MFK.
  1. Provide Favorite MFK common methods.
  1. Provide Favorite MFK crud service.
  1. Provide Favorite MFKs change event API.

- `uiowa-mfk-string`

  1. Show MFK string in a `<span>` tag.
  1. Auto detect BRF field in the string.
