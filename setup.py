# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in yoola_wps_report/__init__.py
from yoola_wps_report import __version__ as version

setup(
	name='yoola_wps_report',
	version=version,
	description='WPS REPORT FOR YOOLA',
	author='Mohammad Ali',
	author_email='swe.mirza.ali@gmail.comm',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
