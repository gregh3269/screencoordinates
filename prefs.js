import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

	    const settings = this.getSettings();

        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup({
            title: _('Settings'),
            description: _('Configure the conversion coordinates'),
        });
        page.add(group);

	    addSpinButton(settings,group,'screen-size','Screen size',1,3840,"Change this value to match the x value at the botom rhs of your screen.");
	    addSpinButton(settings,group,'yodotool-value','Yodotool conversion value',1,600,"Change this value to match yodtool x position at bottom rhs of your screen.");

    }
}

function addSpinButton(settings,group,setting,labelstring,lower,upper,labeltooltip){
	let row = buildActionRow(labelstring,labeltooltip);

	let thisResetButton = buildResetButton(settings,setting);

	let thisSpinButton = new Gtk.SpinButton({
		adjustment: new Gtk.Adjustment({
			lower: lower,
			upper: upper,
			step_increment: 1
		}),
		valign: Gtk.Align.CENTER,
		halign: Gtk.Align.END,
		visible: true
	});
	settings.bind(setting,thisSpinButton,'value',Gio.SettingsBindFlags.DEFAULT);

	row.add_suffix(thisResetButton);
	row.add_suffix(thisSpinButton);

	thisSpinButton.connect('changed',() => {
		if (thisSpinButton.text == settings.get_default_value(setting).print(true))
			thisResetButton.set_visible(false)
		else
			thisResetButton.set_visible(true)
	})

	group.add(row);
	return row;
}

function buildActionRow(labelstring,labeltooltip){
	let row = new Adw.ActionRow({ title: labelstring });
	if ( labeltooltip ){
		if (labeltooltip.length>70){ //could make every tooltip a button if preferred
			let thisInfoButton = buildInfoButton(labeltooltip);
			row.add_suffix(thisInfoButton);
		}
		else
			row.subtitle = labeltooltip;
	}

	return row;
}

function buildResetButton(settings,setting){
	let thisResetButton = new Gtk.Button({
		valign: Gtk.Align.CENTER,
		icon_name: 'edit-clear-symbolic-rtl',
		visible: false
	});

	//hide if matches default setting
	if (settings.get_value(setting).print(true) != settings.get_default_value(setting).print(true))
			thisResetButton.set_visible(true);

	thisResetButton.add_css_class('flat');
	thisResetButton.set_tooltip_text('Reset to Default');

	thisResetButton.connect('clicked',() => {settings.reset(setting)});

	return thisResetButton;
}

function buildInfoButton(labeltooltip){
	let thisInfoButton = new Gtk.MenuButton({
		valign: Gtk.Align.CENTER,
		icon_name: 'dialog-information-symbolic',
		visible: true
	});
	thisInfoButton.add_css_class('flat');
	// thisInfoButton.add_css_class('circular');
	let thisPopover = new Gtk.Popover();
	let thisLabel = new Gtk.Label({
		label: labeltooltip
	});
	thisPopover.set_child(thisLabel);
	thisInfoButton.set_popover(thisPopover);

	return thisInfoButton;
}
