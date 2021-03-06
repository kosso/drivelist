/*
 * Copyright 2018 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const m = require('mochainon');
const parsePairs = require('../lib/lsblk/pairs.js');

describe('Drivelist', function() {

  context('lsblk', function() {

    it('can handle --pairs output on Ubuntu 14.04', function() {

      const listData = fs.readFileSync(path.join(__dirname, 'data', 'lsblk', 'ubuntu-14.04-1.txt'), 'utf8');
      const devices = parsePairs(listData);

      const expected = [ {
        enumerator: 'lsblk:pairs',
        busType: 'UNKNOWN',
        busVersion: null,
        device: '/dev/sda',
        raw: '/dev/sda',
        description: '(/boot/efi, /, [SWAP], /home)',
        error: null,
        size: 1024209543168,
        blockSize: 512,
        logicalBlockSize: 512,
        mountpoints: [ {
          path: '/boot/efi',
          label: undefined
        }, {
          path: '',
          label: undefined
        }, {
          path: '',
          label: undefined
        }, {
          path: '/',
          label: undefined
        }, {
          path: '[SWAP]',
          label: undefined
        }, {
          path: '/home',
          label: undefined
        }, {
          path: '',
          label: undefined
        } ],
        isReadOnly: false,
        isSystem: true,
        isVirtual: null,
        isRemovable: false,
        isCard: null,
        isSCSI: null,
        isUSB: null,
        isUAS: null
      } ];

      console.log(require('util').inspect(parsePairs(listData), {
        colors: true,
        depth: null
      }));

      m.chai.expect(devices).to.deep.equal(expected);

    });

    it('can handle --pairs output on Ubuntu 14.04, sample 2', function() {

      const listData = fs.readFileSync(path.join(__dirname, 'data', 'lsblk', 'ubuntu-14.04-2.txt'), 'utf8');
      const devices = parsePairs(listData);

      const expected = [ {
        enumerator: 'lsblk:pairs',
        busType: 'UNKNOWN',
        busVersion: null,
        device: '/dev/fd0',
        raw: '/dev/fd0',
        description: 'fd0',
        error: null,
        size: null,
        blockSize: 512,
        logicalBlockSize: 512,
        mountpoints: [],
        isReadOnly: false,
        isSystem: false,
        isVirtual: null,
        isRemovable: true,
        isCard: null,
        isSCSI: null,
        isUSB: null,
        isUAS: null
      }, {
        enumerator: 'lsblk:pairs',
        busType: 'UNKNOWN',
        busVersion: null,
        device: '/dev/sda',
        raw: '/dev/sda',
        description: '(/, [SWAP])',
        error: null,
        size: null,
        blockSize: 512,
        logicalBlockSize: 512,
        mountpoints: [ {
          path: '/',
          label: undefined
        }, {
          path: '',
          label: undefined
        }, {
          path: '[SWAP]',
          label: undefined
        } ],
        isReadOnly: false,
        isSystem: true,
        isVirtual: null,
        isRemovable: false,
        isCard: null,
        isSCSI: null,
        isUSB: null,
        isUAS: null
      } ];

      console.log(require('util').inspect(parsePairs(listData), {
        colors: true,
        depth: null
      }));

      m.chai.expect(devices).to.deep.equal(expected);

    });

  });

});
