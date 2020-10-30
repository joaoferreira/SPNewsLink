import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface INewslinkWebPartProps {
    description: string;
}
export default class NewslinkWebPart extends BaseClientSideWebPart<INewslinkWebPartProps> {
    render(): void;
    private postNewsLink;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=NewslinkWebPart.d.ts.map