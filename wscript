#
# This file is the default set of rules to compile a Pebble application.
#
# Feel free to customize this to your needs.
#
import os.path

top = '.'
out = 'build'


def options(ctx):
    ctx.load('pebble_sdk')


def configure(ctx):
    """
    This method is used to configure your build. ctx.load(`pebble_sdk`) automatically configures
    a build for each valid platform in `targetPlatforms`. Platform-specific configuration: add your
    change after calling ctx.load('pebble_sdk') and make sure to set the correct environment first.
    Universal configuration: add your change prior to calling ctx.load('pebble_sdk').
    """
    ctx.load('pebble_sdk')


def build(ctx):
    ctx.load('pebble_sdk')
    ctx.pbl_bundle(js=ctx.path.ant_glob(['src/js/pebblekit/**/*.js',
                                         'src/js/pebblekit/**/*.json',
                                         'src/js/common/**/*.js']),
                   js_entry_file='src/js/pebblekit/app.js',
                   bin_type='rocky')
