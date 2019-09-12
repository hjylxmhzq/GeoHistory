import { eventPopUpTemplate } from "./popUpTemplate";
import { simpleMarkerRender, renderer } from "./renderer";
import { labelingInfo } from './label';
import config from '../../../config';

const baseBoundaryFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
const baseEventFeatureUrl = config.gisRestServer + "events_point/MapServer";
const basePeopleFeatureUrl = config.gisRestServer + "experience/MapServer/";

export const boundaryLayerOption = {
    url: baseBoundaryFeatureUrl,
    id: '0',
    visible: true,
    renderer,
    labelingInfo
};
export const eventLayerOption = {
    url: baseEventFeatureUrl,
    //id: '4',
    visible: true,
    popupTemplate: eventPopUpTemplate,
    renderer: simpleMarkerRender
};
export const peopleLayerOption = {
    url: basePeopleFeatureUrl,
    id: '0',
    visible: true,
    renderer: simpleMarkerRender,
    definitionExpression: 'Sequence=0 and Dynasty_ID=0'
};