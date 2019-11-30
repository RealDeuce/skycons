#!/bin/sh

rm skycons.zip
cd .. && zip -x\*.git\* -r skycons/skycons.zip skycons -x \*.git\* \*zipit.sh
