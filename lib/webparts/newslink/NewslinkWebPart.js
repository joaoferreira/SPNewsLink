var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import styles from './NewslinkWebPart.module.scss';
import * as strings from 'NewslinkWebPartStrings';
import { SPHttpClient } from '@microsoft/sp-http';
import * as $ from 'jquery';
var NewslinkWebPart = /** @class */ (function (_super) {
    __extends(NewslinkWebPart, _super);
    function NewslinkWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewslinkWebPart.prototype.render = function () {
        var ctx = this;
        this.domElement.innerHTML = "\n      <div class=\"" + styles.newslink + "\">\n        <div class=\"" + styles.container + "\">\n          <div class=\"" + styles.row + "\">\n            <div class=\"" + styles.column + "\">\n              <span class=\"" + styles.title + "\">Create a SharePoint news link programatically!</span>\n              <p class=\"" + styles.description + "\"></p>\n              <label class=\"" + styles.label + "\">Site Collection URL</label>\n              <input id=\"SiteCollectionURL\" class=\"" + styles.input + "\"></input> \n              <label class=\"" + styles.label + "\">Title</label>\n              <input id=\"Title\" class=\"" + styles.input + "\"></input>        \n              <label class=\"" + styles.label + "\">Description</label>\n              <input id=\"Description\" class=\"" + styles.input + "\"></input>    \n              <label class=\"" + styles.label + "\">Banner Image URL</label>\n              <input id=\"BannerImageURL\" class=\"" + styles.input + "\"></input>    \n              <label class=\"" + styles.label + "\">Original Source URL</label>\n              <input id=\"OriginalSourceURL\" class=\"" + styles.input + "\"></input>\n              <p></p>\n              <span id=\"Post\" class=\"" + styles.button + "\">\n                <span class=\"" + styles.label + "\">Create</span>\n              </span>\n            </div>\n          </div>\n        </div>\n      </div>";
        $('#Post').on('click', function () {
            var Site = $('#SiteCollectionURL').val();
            var Title = $('#Title').val();
            var Description = $('#Description').val();
            var BannerImageURL = $('#BannerImageURL').val();
            var OriginalSourceURL = $('#OriginalSourceURL').val();
            ctx.postNewsLink(Site, Title, Description, BannerImageURL, OriginalSourceURL);
        });
    };
    NewslinkWebPart.prototype.postNewsLink = function (site, title, description, banner, source) {
        var body = {
            body: "{\"BannerImageUrl\":\"" + banner + "\",\n              \"Description\":\"" + description + "\",\n              \"IsBannerImageUrlExternal\":\"true\",\n              \"OriginalSourceUrl\":\"" + source + "\",\n              \"ShouldSaveAsDraft\":false,\n              \"Title\":\"" + title + "\"\n            }"
        };
        this.context.spHttpClient.post(site + "/_api/sitepages/pages/reposts", SPHttpClient.configurations.v1, body)
            .then(function (response) {
            response.json().then(function (responseJSON) {
                //parser the response message
                console.log(responseJSON);
            });
        });
    };
    NewslinkWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return NewslinkWebPart;
}(BaseClientSideWebPart));
export default NewslinkWebPart;
//# sourceMappingURL=NewslinkWebPart.js.map