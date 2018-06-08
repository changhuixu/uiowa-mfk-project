# UIowa Mfk

[![npm](https://img.shields.io/npm/v/@uiowa/uiowa-mfk.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/uiowa-mfk)

`uiowa-mfk` is a full-fledged Angular library for MFK input and Favorite MFK management. This library has peer dependency on Angular 6, ng-bootstrap 2, Bootstrap 4 (css) and Font-Awesome 4.7, as of May, 2018. The version number of this library is following the major and minor version of Angular.

## Features

- `uiowa-mfk-input`

  1.  Number only input fields with fixed lengths.
  2.  Smartly handle paste strings for input fields.
  3.  Auto fill 0s in the MFK input field when hit <kbd>Tab</kbd> key.
  4.  Auto focus next fields when current MFK input field is full.
  5.  Allow set field(s) default value(s).
  6.  Allow set readonly field(s).
  7.  Provide MFK common methods.
  8.  Provide MFK validation method and service.
  9.  Provide MFK change event API.

- `uiowa-favorite-mfk`

  1.  Select Favorite MFK and show it in MFK input.
  2.  Clear MFK input.
  3.  Real-time indication for determine if an MFK is "favorite" or not.
  4.  Add/Remove Favorite MFK.
  5.  Provide Favorite MFK common methods.
  6.  Provide Favorite MFK crud service.
  7.  Provide Favorite MFKs change event API.

- `uiowa-mfk-string`

  1.  Show MFK string in a `<span>` tag.
  2.  Auto detect BRF field in the string.
