import { GenType } from '@/main';
import { OptionValues } from 'commander';
export declare const genTemplateFile: (code: string, genType: GenType, options: OptionValues) => Promise<void>;
