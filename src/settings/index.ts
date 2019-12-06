import Settings from './settings';
import ExtensionSettings from './extension';
import Session from './session';
import Metadata from './metadata';

export const extensionSettings = ExtensionSettings.getInstance();
export const settings = Settings.getInstance();
export const _session = Session.getInstance();
export const metadata = Metadata.getInstance();