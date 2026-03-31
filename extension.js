// See gnome-extensions create -i
import GObject from 'gi://GObject';
import St from 'gi://St';
import GLib from 'gi://GLib';
import Clutter from 'gi://Clutter';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

let timeoutContinue = true;

const Indicator = GObject.registerClass(
class Indicator extends PanelMenu.Button {
    _init(settings) {
        super._init(0.0, _('coordinates'));

        this.settings = settings;

        this.label = new St.Label({
            text: "XY",
            y_expand: true,
            y_align: Clutter.ActorAlign.CENTER
        });

        this.add_child(this.label);

        this._updateLabel();

        GLib.timeout_add(GLib.PRIORITY_DEFAULT, 100, () => {
            return timeoutContinue ? this._updateLabel() : false;
        });
    }

    _updateLabel() {
        this.label.set_text(this._getCoordinates());
        return true;
    }

    _getCoordinates() {

        const SCREEN_SIZE = this.settings.get_int('screen-size');
		const YDOTOOL_VALUE = this.settings.get_int('ydotool-value');
        let conv = SCREEN_SIZE / YDOTOOL_VALUE;

        let [mouse_x, mouse_y] = global.get_pointer();
        return `X: ${mouse_x} (${Math.round( mouse_x / conv )}) Y: ${mouse_y} (${Math.round( mouse_y / conv )})`;

    }

    destroy() {
      super.destroy();
    }

});

export default class ScreenCoordinatesExtension extends Extension {
    enable() {
        //log('enable');
        timeoutContinue = true;
        this._indicator = new Indicator(this.getSettings());
        Main.panel.addToStatusArea(this.uuid, this._indicator);
    }

    disable() {
        //log('disable/destroy');
        timeoutContinue = false;
        this._indicator.destroy();
        this._indicator = null;
    }
}

