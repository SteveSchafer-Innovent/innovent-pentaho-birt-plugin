/*!
 * Copyright 2010 - 2015 Pentaho Corporation.  All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file expect in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

define(["common-ui/prompting/api/EventAPI"], function(EventAPI) {
  describe("EventAPI unit tests", function() {
    var eventApi, apiSpy, promptPanelSpy, dashboardSpy, callback;
    beforeEach(function() {
      dashboardSpy = jasmine.createSpyObj("Dashboard", ["on"]);

      promptPanelSpy = jasmine.createSpy("PromptPanel");
      promptPanelSpy.dashboard = dashboardSpy;

      apiSpy = jasmine.createSpy("PromptingAPI");
      apiSpy.operation = jasmine.createSpyObj("OperationAPI", ["_getPromptPanel"]);
      apiSpy.operation._getPromptPanel.and.returnValue(promptPanelSpy);

      eventApi = new EventAPI(apiSpy);

      callback = jasmine.createSpy("Callback");
    });

    afterEach(function() {
      expect(apiSpy.operation._getPromptPanel).toHaveBeenCalled();
    });

    it("should register a beforeRender event", function() {
      eventApi.beforeRender(callback);
      expect(promptPanelSpy.onBeforeRender).toBeDefined();
      expect(promptPanelSpy.onBeforeRender).toBe(callback);
    });

    it("should register a afterRender event", function() {
      eventApi.afterRender(callback);
      expect(promptPanelSpy.onAfterRender).toBeDefined();
      expect(promptPanelSpy.onAfterRender).toBe(callback);
    });

    it("should register a parameterChanged event", function() {
      eventApi.parameterChanged(callback);
      expect(promptPanelSpy.onParameterChanged).toBeDefined();
      expect(promptPanelSpy.onParameterChanged).toBe(callback);
    });

    it("should register a postInit event", function() {
      eventApi.postInit(callback);
      expect(dashboardSpy.on).toHaveBeenCalledWith('cdf:postInit', callback);
    });
  });
});