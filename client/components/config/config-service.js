/**
 * @copyright Copyright 2014 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Service for the configuration of the Explorer app.
 *
 * The initial settings are loaded from a global var INITIAL_CONFIG.  This
 * is set by the server-side templates when rendering the page, to minimize
 * initial roundtrips.
 * @author joemu@google.com (Joe Allan Muharsky)
 */

goog.provide('p3rf.perfkit.explorer.components.config.ConfigService');


goog.scope(function() {
var explorer = p3rf.perfkit.explorer;



/**
 * Service that provides model access for the Explorer page at the top-level.
 * @param {!Angular.HttpService} $location
 * @param {!Angular.LocationService} $location
 * @constructor
 * @ngInject
 */
explorer.components.config.ConfigService = function($http, $location) {
  /**
   * @type {!Angular.HttpService}
   * @private
   */
  this.http_ = $http;

  /**
   * @type {!Angular.LocationService}
   * @private
   */
  this.location_ = location;

  /**
   * @type {!string}
   * @export
   */
  this.default_project = INITIAL_CONFIG.default_project;

  /**
   * @type {!string}
   * @export
   */
  this.default_dataset = INITIAL_CONFIG.default_dataset;

  /**
   * @type {!string}
   * @export
   */
  this.default_table = INITIAL_CONFIG.default_table;

  /**
   * @type {!string}
   * @export
   */
  this.analytics_key = INITIAL_CONFIG.analytics_key;

  /**
   * @type {!number}
   * @export
   */
  this.cache_duration = INITIAL_CONFIG.cache_duration;
};
var ConfigService = explorer.components.config.ConfigService;


/**
 * Sets properties based on the JSON data received.
 *
 * @param {!object} data A JSON object containing config data.
 */
ConfigService.prototype.populate = function(data) {
  if (goog.isDef(data.default_project)) {
    this.default_project = data.default_project;
  }

  if (goog.isDef(data.default_dataset)) {
    this.default_dataset = data.default_dataset;
  }

  if (goog.isDef(data.default_table)) {
    this.default_table = data.default_table;
  }

  if (goog.isDef(data.analytics_key)) {
    this.analytics_key = data.analytics_key;
  }

  if (goog.isDef(data.cache_duration)) {
    this.cache_duration = data.cache_duration;
  }
};


/**
 * Provides a copy of the object as JSON.
 *
 * @param {?Object} data An object that the properties will be applied to.
 * @return {!Object} A JSON representation of the config properties.
 */
ConfigService.prototype.toJSON = function(data) {
  var result = data || {};

  result.default_project = this.default_project;
  result.default_dataset = this.default_dataset;
  result.default_table = this.default_table;
  result.analytics_key = this.analytics_key;
  result.cache_duration = this.cache_duration;

  return result;
};


/**
 * Reloads the global config from the server.
 */
ConfigService.prototype.refresh = function() {
  var promise = this.http_.get('/config');

  promise.then(
      angular.bind(this, function(config) {
        this.populate(config.data);
      })
  );
};


/**
 * Updates the global config on the server.
 */
ConfigService.prototype.update = function() {
  var promise = this.http_.post('/config', this.toJSON());

  promise.then(function() {
      console.log('Global config updated.');
  });
};


});  // goog.scope
