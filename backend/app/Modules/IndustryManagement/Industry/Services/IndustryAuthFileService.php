<?php

namespace App\Modules\IndustryManagement\Industry\Services;

use App\Http\Services\FileService;
use App\Modules\IndustryManagement\Industry\Models\IndustryAuth;

class IndustryAuthFileService
{
    public function __construct(private IndustryAuthService $industryAuthService, private FileService $fileService){}

    private function saveFile(IndustryAuth $industry, string $file_name, string $path): IndustryAuth
    {
        $saved_file_name = $this->fileService->save_file($file_name, $path);
        return $this->industryAuthService->update([
            $file_name => $saved_file_name,
        ], $industry);
    }

    public function saveRegDoc(IndustryAuth $industry): IndustryAuth
    {
        return $this->saveFile($industry, 'reg_doc', (new IndustryAuth)->reg_doc_path);
    }

    public function saveSign(IndustryAuth $industry): IndustryAuth
    {
        return $this->saveFile($industry, 'sign', (new IndustryAuth)->sign_path);
    }

    public function saveSeal(IndustryAuth $industry): IndustryAuth
    {
        return $this->saveFile($industry, 'seal', (new IndustryAuth)->seal_path);
    }

    public function savePan(IndustryAuth $industry): IndustryAuth
    {
        return $this->saveFile($industry, 'pan', (new IndustryAuth)->pan_path);
    }

    public function saveGst(IndustryAuth $industry): IndustryAuth
    {
        return $this->saveFile($industry, 'gst', (new IndustryAuth)->gst_path);
    }

}
