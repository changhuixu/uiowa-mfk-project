# UIowa Mfk

[![Build Status](https://github.com/changhuixu/uiowa-mfk-project/actions/workflows/main.yml/badge.svg)](https://github.com/changhuixu/uiowa-mfk-project/actions)
[![npm](https://img.shields.io/npm/v/@uiowa/uiowa-mfk.svg?style=flat-square)](https://www.npmjs.com/package/@uiowa/uiowa-mfk)

`uiowa-mfk` is a full-fledged Angular library for MFK input. Based on this library, the demo app shows some common configurations of MFK inputs, validations, and Favorite MFK management. This library has peer dependency on Angular >=12 and [@uiowa/digit-only](https://github.com/changhuixu/ngx-digit-only), as of Nov, 2021. The version number of this library is following the major and minor version of Angular.

## [Demo](https://changhuixu.github.io/uiowa-mfk-project/)

## Features

- `uiowa-mfk-input` component

  1. Number only input fields with fixed lengths.
  1. Smartly handle paste strings for input fields.
  1. Auto fill 0s in the MFK input field when hit <kbd>Tab</kbd> key.
  1. Auto jump to the previous field in the MFK input component when hit <kbd>Backspace</kbd> key.
  1. Auto focus next fields when current MFK input field is full.
  1. Allow set field(s) default value(s).
  1. Allow set readonly field(s).
  1. Provide MFK common methods.
  1. Provide MFK validation method and service.
  1. Provide MFK change event API.

- `uiowa-mfk-string` component

  1. Show MFK string in a `<span>` tag.
  1. Auto detect BRF field in the string.

- `mfkString` pipe and `whoKeyString` pipe

## Other possible features

- `uiowa-favorite-mfk`

  1. Select Favorite MFK and show it in MFK input.
  1. Clear MFK input.
  1. Real-time indication for determine if an MFK is "favorite" or not.
  1. Add/Remove Favorite MFK.
  1. Provide Favorite MFK common methods.
  1. Provide Favorite MFK crud service.
  1. Provide Favorite MFKs change event API.

- `split-cost`

  1. Allow to add one or more MFKs and set their percentages.
  1. Allow to edit/delete MFKs and their percentages.
  1. Check if the total percentage is 100%.
