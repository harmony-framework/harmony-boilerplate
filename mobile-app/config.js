'use strict';

const fs = require('fs');
const path = require('path');
const et = require('elementtree');

const ENV = process.env.NODE_ENV;
const src = {
  android: (ENV === 'development') ? 'http://10.0.2.2:8082/' : 'index.html',
  ios: (ENV === 'development') ? 'http://localhost:8082/' : 'index.html',
};
const config = path.resolve(__dirname, "config.xml");

try {
  var configXML = new et.ElementTree(
    et.XML(
      fs.readFileSync(config, 'utf-8')
    )
  );
  configXML.getroot()._children.forEach(function(el) {
    if (el.tag === 'platform') {
      if (el.attrib.name === 'android' || el.attrib.name === 'ios') {
        el._children.forEach(function(child) {
          if (child.tag === 'content') {
            console.log('Setting ' + el.attrib.name + ' src to ' + src[el.attrib.name])
            child.attrib.src = src[el.attrib.name];
          }
        });
      }
    }
  });
  fs.writeFileSync(config, configXML.write({indent: 4}), 'utf-8');

} catch (err) {
  console.error('ERROR: Could not replace content src in: ' + config, err);
  process.exit(1);
}
