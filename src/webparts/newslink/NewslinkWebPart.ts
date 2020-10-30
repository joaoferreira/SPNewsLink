import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './NewslinkWebPart.module.scss';
import * as strings from 'NewslinkWebPartStrings';

import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

import * as $ from 'jquery';


export interface INewslinkWebPartProps {
  description: string;
}

export default class NewslinkWebPart extends BaseClientSideWebPart<INewslinkWebPartProps> {

  public render(): void {
    var ctx = this;
    this.domElement.innerHTML = `
      <div class="${ styles.newslink }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">Create a SharePoint news link programatically!</span>
              <p class="${ styles.description }"></p>
              <label class="${ styles.label }">Site Collection URL</label>
              <input id="SiteCollectionURL" class="${ styles.input }"></input> 
              <label class="${ styles.label }">Title</label>
              <input id="Title" class="${ styles.input }"></input>        
              <label class="${ styles.label }">Description</label>
              <input id="Description" class="${ styles.input }"></input>    
              <label class="${ styles.label }">Banner Image URL</label>
              <input id="BannerImageURL" class="${ styles.input }"></input>    
              <label class="${ styles.label }">Original Source URL</label>
              <input id="OriginalSourceURL" class="${ styles.input }"></input>
              <p></p>
              <span id="Post" class="${ styles.button }">
                <span class="${ styles.label }">Create</span>
              </span>
            </div>
          </div>
        </div>
      </div>`;      

      
      
      $('#Post').on('click',function(){
        var Site = $('#SiteCollectionURL').val();
        var Title = $('#Title').val();
        var Description = $('#Description').val();
        var BannerImageURL = $('#BannerImageURL').val();
        var OriginalSourceURL = $('#OriginalSourceURL').val(); 
        ctx.postNewsLink(Site, Title, Description, BannerImageURL, OriginalSourceURL);
      });
  }

  private postNewsLink(site, title, description, banner, source): void {
    const body: ISPHttpClientOptions = {
      body: `{"BannerImageUrl":"${banner}",
              "Description":"${description}",
              "IsBannerImageUrlExternal":"true",
              "OriginalSourceUrl":"${source}",
              "ShouldSaveAsDraft":false,
              "Title":"${title}"
            }`
    };

    this.context.spHttpClient.post(site + "/_api/sitepages/pages/reposts", SPHttpClient.configurations.v1, body)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: JSON) => {
          //parser the response message
          console.log(responseJSON);
        });
      });
  }

 

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
