declare module 'anchor-pki/auto-cert/integrations/next' {
    export interface AutoCertOptions {
        enabledEnv?: string;
    }
    
    export default function autoCert(options?: AutoCertOptions): (config: any) => any;
}
