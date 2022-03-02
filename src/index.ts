/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import {bootstrapExtra} from '@workadventure/scripting-api-extra'

console.log('Script started successfully');

async function extendedFeatures() {
    try {
        await bootstrapExtra()
        console.log('Scripting API Extra loaded successfully');
    } catch (error) {
        console.error('Scripting API Extra ERROR',error);
    }
}
extendedFeatures();

// Manage popups
let currentZone: string;
let currentPopup: any;

const config = [
    {
        zone: 'followUs',
        message: 'Suivez-nous sur LinkedIn !',
        cta: [
            {
                label: 'LinkedIn',
                className: 'primary',
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/scalezia'),
            },
        ]
    }
]

// Popups
WA.room.onEnterZone('followUs1', () => openPopup('followUs1'));
WA.room.onLeaveZone('followUs1', closePopup);

// Popup management functions
function openPopup(zoneName: string) {
    currentZone = zoneName
    const popupName = zoneName + 'Popup'
    const zone = config.find((item) => {
        return item.zone == zoneName
    });

    if (typeof zone !== 'undefined') {
        // @ts-ignore otherwise we can't use zone.cta object
        currentPopup = WA.ui.openPopup(popupName, zone.message, zone.cta)
    }
}
function closePopup(){
    if (typeof currentPopup !== 'undefined') {
        currentPopup.close();
        currentPopup = undefined;
    }
}