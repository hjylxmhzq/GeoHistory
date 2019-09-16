import { eventPopUpTemplate, peoplePopUpTemplate,boundaryPopUpTemplate } from "./popUpTemplate";
import { simpleMarkerRender, simplePeopleMarkerRender, renderer } from "./renderer";
import { labelingInfo } from './label';
import config from '../../../config';

const baseBoundaryFeatureUrl = config.gisRestServer + "country_boundary/MapServer/";
const baseEventFeatureUrl = config.gisRestServer + "events_point/MapServer/";
const basePeopleFeatureUrl = config.gisRestServer + "experience/MapServer/0";

export const boundaryLayerOption = {
    url: baseBoundaryFeatureUrl + '69',
    // id: '0',
    visible: true,
    // popupTemplate: boundaryPopUpTemplate,
    renderer,
    labelingInfo
};
export const eventLayerOption = {
    url: baseEventFeatureUrl + '12',
    //id: '4',
    visible: true,
    popupTemplate: eventPopUpTemplate,
    renderer: simpleMarkerRender
};
export const peopleLayerOption = {
    url: basePeopleFeatureUrl,
    visible: true,
    renderer: simplePeopleMarkerRender,
    popupTemplate: peoplePopUpTemplate,
    definitionExpression: 'Sequence=0 and Dynasty_ID=12'
};