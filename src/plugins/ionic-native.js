import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

export default {
  install(Vue) {
    Vue.prototype.$file = File;
    Vue.prototype.$fileChooser = FileChooser;
    Vue.prototype.$filePath = FilePath;
  }
};