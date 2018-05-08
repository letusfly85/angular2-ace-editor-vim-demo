import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import 'brace/theme/github';
import 'brace/mode/python';
import 'brace/keybinding/vim';
declare let ace: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  content: string;
  options: any;
  @ViewChild('highlight') highlight;
  @ViewChild('editorInfinity') editorInfinity;
  @ViewChild('firstEditor') firstEditor;

  ngOnInit() {
    this.content = '';
    this.options = {maxLines: 1000, printMargin: false};
  }

  onRuleChange(e) {
    console.log(e);
  }

  ngAfterViewInit() {
    const editor = this.firstEditor.getEditor();

    editor.session.setOption('useWorker', true);
    editor.setOption('fontSize', '16pt');
    ace.config.loadModule('ace/keyboard/vim', module => {
      const VimApi = module.CodeMirror.Vim;
      VimApi.defineEx('write', 'w', (cm, input) => {
        console.log('write');
      });
    });
    editor.setKeyboardHandler('ace/keyboard/vim');
  }
}
