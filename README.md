
![alt text](https://github.com/gregh3269/screencoordinates/raw/main/screenshot.png "extension screenshot")

# About
An simple extension to help calculate ydotool screen coordinates -x & -y from the actual mouse position.

### More info about the installation

The default installation path is: `~/.local/share/gnome-shell/extensions/screencoordinates@gregh3269.github.com`

This extension (for GNOME 47/48) can be installed by simply copying the repository to the default installation path.


### Using the extension

Before using the extension, adjust the values in Extension settings to match your screen size.  

1. Move the mouse to the bottom right hand side of the screen. Take a note of the X: value in the top panel.
2. Start ydotool and run the command to position the mouse also at the bottom right hand side of the screen.

   YDOTOOL_SOCKET="$HOME/.ydotool_socket" ydotool mousemove --absolute -x 392 -y 314

   eg screen size 1280*1024 gives an X: value of 1279 and corresponding ydotool -x value of 392.
 
   In the extenston settings, set these two values.

   Check by using:

   YDOTOOL_SOCKET="$HOME/.ydotool_socket" ydotool mousemove --absolute -x 250 -y 250

   the values in brackets (top panel) should hopefully match approximately X:814 (249) Y:814 (249) .

   Possibly there is a corect way to do this, but I was unable to make it work for my different screens.

## Contribution

Feel free to submit an issue if you have encountered a bug, or want to ask something.

Inspired by https://github.com/tobias47n9e/ScreenCoordinates
