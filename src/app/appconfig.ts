import {MsComponentData} from './models/ms-component-data';

export const MS_COMPONENT_TYPE: any = {
    ENDPOINT: 'endpoint',
    SCOPE: 'scope'
}

export const CONNECTOR_POSITION_TYPE: any = {
    TOP_POSITION: 'top-position',
    LEFT_POSITION: 'left-position',
    BOTTOM_POSITION: 'bottom-position',
    RIGHT_POSITION: 'right-position'
}

export const MS_COMPONENTS: MsComponentData[] =  [{
    uid: 'ajax',
    title: 'AJAX',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/ajax_drag_icon.png',
    type: MS_COMPONENT_TYPE.ENDPOINT
  },{
    uid: 'ftp',
    title: 'FTP',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/ftp_drag_icon.png',
    type: MS_COMPONENT_TYPE.ENDPOINT
  },{
    uid: 'file',
    title: 'File',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/file_drag_icon.png',
    type: MS_COMPONENT_TYPE.ENDPOINT
  },{
    uid: 'async',
    title: 'Async',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/async_drag_icon.png',
    type: MS_COMPONENT_TYPE.SCOPE
  },{
    uid: 'composite_source',
    title: 'Composite Source',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/composite_drag_icon.png',
    type: MS_COMPONENT_TYPE.SCOPE
  },{
    uid: 'message_enricher',
    title: 'Message Enricher',
    icon: 'fa fa-file',
    dragIcon: '/assets/images/message_drag_icon.png',
    type: MS_COMPONENT_TYPE.SCOPE
  }
];