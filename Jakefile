/*
 *  Copyright 2012 Research In Motion Limited.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

desc("runs jake build");
task('default', [], require('./build/build'));

desc("package framework - jake build");
task('build', [], require('./build/build'));

desc("run all tests in node - jake test [path,path2]");
task('test', [], function () {
    require('./build/test');
});

desc("runs jshint + csslint - jake lint [path1] [path2]");
task('lint', [], function () {
    require('./build/lint')(complete, Array.prototype.slice.call(arguments));
}, true);

desc("show various codebase stats");
task('stats', [], require('./build/stats'));
