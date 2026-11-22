/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {HashRouter, Route, Routes} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import {EnvironmentProvider} from './context/EnvironmentContext';
import {DesktopEnvironment} from './components/DesktopEnvironment';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <EnvironmentProvider>
          <Routes>
            <Route path="/" element={<DesktopEnvironment />} />
            <Route path="/:moduleId" element={<DesktopEnvironment />} />
            <Route path="/projects/:projectId" element={<DesktopEnvironment />} />
            <Route path="*" element={<DesktopEnvironment />} />
          </Routes>
        </EnvironmentProvider>
      </HashRouter>
    </MotionConfig>
  );
}
