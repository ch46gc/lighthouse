/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Runner = require('../../../../runner');
const assert = require('assert');

const trace = require('../../../fixtures/traces/progressive-app-m60.json');
const devtoolsLog = require('../../../fixtures/traces/progressive-app-m60.devtools.log.json');

/* eslint-env mocha */
describe('Metrics: Lantern FCP', () => {
  it('should compute predicted value', async () => {
    const artifacts = Runner.instantiateComputedArtifacts();
    const result = await artifacts.requestLanternFirstContentfulPaint({trace, devtoolsLog});

    assert.equal(Math.round(result.timing), 2038);
    assert.equal(Math.round(result.optimisticEstimate.timeInMs), 611);
    assert.equal(Math.round(result.pessimisticEstimate.timeInMs), 611);
    assert.equal(result.optimisticEstimate.nodeTiming.size, 2);
    assert.equal(result.pessimisticEstimate.nodeTiming.size, 2);
    assert.ok(result.optimisticGraph, 'should have created optimistic graph');
    assert.ok(result.pessimisticGraph, 'should have created pessimistic graph');
  });
});
