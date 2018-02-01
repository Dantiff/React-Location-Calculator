import React from 'react';

export function cleanFormErrors(errors) {

  let return_block = {};

  if (errors !== undefined) {
  	
	  errors.map((e) => {

	      let pointer = e.source.pointer;
	      let attr = pointer.substring(pointer.lastIndexOf("/") + 1, pointer.length);

	      if (attr.indexOf('.') !== -1) {
					let parent = attr.substring(0, attr.indexOf("."));
					let child = attr.substring(attr.indexOf(".") + 1, attr.length);

					return_block[parent] = {};

					return_block[parent][child] = <div className="form-errors"> { e.detail } </div>;

					return return_block[parent][child + "_key"] = true;
	      } else {

		      return_block[attr] = <div className="form-errors"> { e.detail } </div>;

		      return return_block[attr + "_key"] = true;
	      }

	  });
  }

  return return_block;
}

  
