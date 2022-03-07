/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');
console.log('V2');

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)
    
    // Popups
    WA.room.onEnterZone('followUs', () => openPopup('followUs'));
    WA.room.onLeaveZone('followUs', closePopup);

    // Show/hide amphi door
    if (WA.player.tags.includes('admin') || WA.player.tags.includes('scalezia') || WA.player.tags.includes('premium')){
        WA.room.hideLayer('closedAmphi')
        WA.room.showLayer('openAmphi')
    } else {
        WA.room.showLayer('closedAmphi')
        WA.room.hideLayer('openAmphi')
    }

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));
}).catch(e => console.error(e));

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
                callback: () => WA.nav.openTab('https://www.linkedin.com/company/scalezia/'),
            },
        ]
    }
]

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