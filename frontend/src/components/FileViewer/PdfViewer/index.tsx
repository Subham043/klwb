import { useMemo, useState } from "react";
import classes from "./index.module.css";
import { Document, Page, pdfjs } from 'react-pdf';
import { ButtonGroup, IconButton, Loader, Message, Modal, Pagination, Stack } from "rsuite";
import TextImageIcon from '@rsuite/icons/TextImage';
import PlusIcon from '@rsuite/icons/Plus';
import MinusIcon from '@rsuite/icons/Minus';
import ReloadIcon from '@rsuite/icons/Reload';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PdfViewer({ src, name }: { src: string | undefined; name?: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRoatate] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const credentials = useMemo(() => {
    return { withCredentials: true };
  }, []);

  return (
    <>
      <IconButton appearance="primary" color="green" icon={<TextImageIcon />} onClick={() => setOpen(true)}>
        View PDF
      </IconButton>
      <Modal size="sm" className="pdf-reader-modal" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{name || 'PDF Viewer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="pdf-reader-custom">
            <Document 
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              options={credentials}
              loading={<Loader center size="sm" content="loading" />} 
              error={
                <Message type="error" bordered showIcon>
                  <strong>Error!</strong> Failed to load PDF. Please try again later.
                </Message>
              }
            >
              <Page pageNumber={pageNumber} height={700} className={classes.pdf_page} scale={scale} rotate={rotate} />
            </Document>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-1">
            <Stack direction="row" spacing={6} justifyContent="space-between" alignItems="center">
              <ButtonGroup>
                <IconButton icon={<FileDownloadIcon />} as={"a"} href={src} target="_blank" download />
                <IconButton icon={<ReloadIcon />} onClick={() => setRoatate(rotate + 90)} />
                <IconButton icon={<MinusIcon />} disabled={scale <= 1} onClick={() => setScale(scale - 0.5)} />
                <IconButton icon={<PlusIcon />} onClick={() => setScale(scale + 0.5)} />
              </ButtonGroup>
              <Pagination
                prev
                last
                next
                first
                size="sm"
                ellipsis={true}
                total={numPages}
                limit={1}
                maxButtons={5}
                activePage={pageNumber}
                onChangePage={setPageNumber}
              />
            </Stack>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
