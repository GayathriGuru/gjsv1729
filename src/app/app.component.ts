import { Component, OnInit } from '@angular/core';
// @ts-ignore
import grapesjs from 'node_modules/grapesjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  editor: any;
  constructor(){

  }
  ngOnInit(){
    const plugins = ['grapesjs-preset-webpage'];
    this.editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      height: '1000px',
      width: 'auto',
      storageManager: false,
      plugins: plugins,
      pluginsOpts: {
        'grapesjs-preset-webpage': {

        },
      },
      //panels: { defaults: [] },
    });
    this.content();
    this.initializeLabelMethod();
  }

  //Label custom trait text area trait
  content() {
    this.editor.TraitManager.addType('content', {
        events: {
            'keyup': 'onChange',  // trigger parent onChange method on keyup
        },

        getInputEl: function () {
            if (!this.inputEl) {
                const input = document.createElement('textarea');
                input.value = this.target.get('content');
                this.inputEl = input;
            }
            return this.inputEl;
        },
        onValueChange: function () {
             this.target.set('content', this.model.get('value'));
        }
    });

}

  //Label trait settings
  initializeLabelMethod() {

    const comps = this.editor.DomComponents;
    const defaultType = comps.getType('default');
    const defaultModel = defaultType.model;
    comps.addType('label', {
      model: defaultModel.extend(
        {
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: '*',
            droppable: false,
            traits: [
              {
                label: 'Name',
                name: 'name',
                type: 'text',
                changeProp: 1
              },
              {
                type: 'content',
                label: 'contentName',
                name: 'contentname',
                changeProp: 1
              },
            ],
          }),
          init() {

          },
        },
        {
          isComponent:  (el: { tagName: string; })=> {
            if (el.tagName === 'LABEL') {
              return {
                type: 'label'
              };
            }
            else
            {
              return el.tagName;
            }
          }
        }
      ),

      // Define the View

      view: defaultType.view
    });
  }

}
