import ProjectSettings from './settings';
import ExtensionSettings from './extension';
import ProjectSession from './session';
import Metadata from './metadata';

export const extensionSettings = ExtensionSettings.getInstance();
export const projectSettings = ProjectSettings.getInstance();
export const projectSession = ProjectSession.getInstance();
export const metadata = Metadata.getInstance();