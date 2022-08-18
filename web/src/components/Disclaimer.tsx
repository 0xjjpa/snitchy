import { MDXRemote } from 'next-mdx-remote';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text
} from "@chakra-ui/react";

export const disclaimerText = `
_Last updated August 16, 2022_
<br/>
<br/>
### WEBSITE DISCLAIMER
<br/>
The information provided by E Nigma Technologies OÜ ('we', 'us', or 'our') on https://snitchy.xyz (the 'Site')
is for general informational purposes only. All information on the Site is provided in good faith, however we
make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity,
reliability, availability, or completeness of any information on the Site. UNDER NO CIRCUMSTANCE SHALL WE HAVE
ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE
ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE
IS SOLELY AT YOUR OWN RISK.
<br/>
<br/>
### EXTERNAL LINKS DISCLAIMER
<br/>
The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or
originating from third parties or links to websites and features in banners or other advertising. Such external
links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability,
or completeness by us. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR
RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE
LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING
ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.
<br/>
<br/>
### PROFESSIONAL DISCLAIMER
<br/>
The Site cannot and does not contain legal advice. The legal information is provided for general informational
and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any
actions based upon such information, we encourage you to consult with the appropriate professionals. We do not
provide any kind of legal advice. THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT
YOUR OWN RISK.
`

export const Disclaimer = ({ disclaimerText }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <span onClick={onOpen}>Disclaimer</span>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Disclaimer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MDXRemote {...disclaimerText}  />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}