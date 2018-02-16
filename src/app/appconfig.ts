import {Endpoint} from './models/endpoint';
import {Scope} from './models/scope';

export const ENDPOINTS: Endpoint[] =  [{
    uid: 'ajax',
    title: 'AJAX',
    icon: 'fa fa-file',
  },{
    uid: 'ftp',
    title: 'FTP',
    icon: 'fa fa-file',
  },{
    uid: 'file',
    title: 'File',
    icon: 'fa fa-file',
  }
];

export const SCOPES: Scope[] = [{
    uid: 'async',
    title: 'Async',
    icon: 'fa fa-file',
  },{
    uid: 'composite_source',
    title: 'Composite Source',
    icon: 'fa fa-file',
  },{
    uid: 'message_enricher',
    title: 'Message Enricher',
    icon: 'fa fa-file',
}];