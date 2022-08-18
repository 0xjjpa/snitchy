import { useEffect, useState } from "react";
import { serialize } from 'next-mdx-remote/serialize';
import {
  Link as ChakraLink,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";
import { Wallet, Contract, providers, utils } from "ethers";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Disclaimer, disclaimerText } from "../components/Disclaimer";

const TC_ADDRESS = atob(
  "MHg3MjIxMjJkRjEyRDRlMTRlMTNBYzNiNjg5NWE4NmU4NDE0NWI2OTY3"
);
const TC_ABI = JSON.parse(
  atob(
    "W3siaW5wdXRzIjpbeyJpbnRlcm5hbFR5cGUiOiJhZGRyZXNzIiwibmFtZSI6Il90b3JuYWRvVHJlZXMiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW50ZXJuYWxUeXBlIjoiYWRkcmVzcyIsIm5hbWUiOiJfZ292ZXJuYW5jZSIsInR5cGUiOiJhZGRyZXNzIn0seyJjb21wb25lbnRzIjpbeyJpbnRlcm5hbFR5cGUiOiJjb250cmFjdCBJVG9ybmFkb0luc3RhbmNlIiwibmFtZSI6ImFkZHIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiY29tcG9uZW50cyI6W3siaW50ZXJuYWxUeXBlIjoiYm9vbCIsIm5hbWUiOiJpc0VSQzIwIiwidHlwZSI6ImJvb2wifSx7ImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElFUkMyMCIsIm5hbWUiOiJ0b2tlbiIsInR5cGUiOiJhZGRyZXNzIn0seyJpbnRlcm5hbFR5cGUiOiJlbnVtIFRvcm5hZG9Qcm94eS5JbnN0YW5jZVN0YXRlIiwibmFtZSI6InN0YXRlIiwidHlwZSI6InVpbnQ4In1dLCJpbnRlcm5hbFR5cGUiOiJzdHJ1Y3QgVG9ybmFkb1Byb3h5Lkluc3RhbmNlIiwibmFtZSI6Imluc3RhbmNlIiwidHlwZSI6InR1cGxlIn1dLCJpbnRlcm5hbFR5cGUiOiJzdHJ1Y3QgVG9ybmFkb1Byb3h5LlRvcm5hZG9bXSIsIm5hbWUiOiJfaW5zdGFuY2VzIiwidHlwZSI6InR1cGxlW10ifV0sInN0YXRlTXV0YWJpbGl0eSI6Im5vbnBheWFibGUiLCJ0eXBlIjoiY29uc3RydWN0b3IifSx7ImFub255bW91cyI6ZmFsc2UsImlucHV0cyI6W3siaW5kZXhlZCI6dHJ1ZSwiaW50ZXJuYWxUeXBlIjoiYWRkcmVzcyIsIm5hbWUiOiJzZW5kZXIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6ZmFsc2UsImludGVybmFsVHlwZSI6ImJ5dGVzIiwibmFtZSI6ImVuY3J5cHRlZE5vdGUiLCJ0eXBlIjoiYnl0ZXMifV0sIm5hbWUiOiJFbmNyeXB0ZWROb3RlIiwidHlwZSI6ImV2ZW50In0seyJhbm9ueW1vdXMiOmZhbHNlLCJpbnB1dHMiOlt7ImluZGV4ZWQiOnRydWUsImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElUb3JuYWRvSW5zdGFuY2UiLCJuYW1lIjoiaW5zdGFuY2UiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW5kZXhlZCI6ZmFsc2UsImludGVybmFsVHlwZSI6ImVudW0gVG9ybmFkb1Byb3h5Lkluc3RhbmNlU3RhdGUiLCJuYW1lIjoic3RhdGUiLCJ0eXBlIjoidWludDgifV0sIm5hbWUiOiJJbnN0YW5jZVN0YXRlVXBkYXRlZCIsInR5cGUiOiJldmVudCJ9LHsiYW5vbnltb3VzIjpmYWxzZSwiaW5wdXRzIjpbeyJpbmRleGVkIjpmYWxzZSwiaW50ZXJuYWxUeXBlIjoiY29udHJhY3QgSVRvcm5hZG9UcmVlcyIsIm5hbWUiOiJhZGRyIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJUb3JuYWRvVHJlZXNVcGRhdGVkIiwidHlwZSI6ImV2ZW50In0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6ImJ5dGVzW10iLCJuYW1lIjoiX2VuY3J5cHRlZE5vdGVzIiwidHlwZSI6ImJ5dGVzW10ifV0sIm5hbWUiOiJiYWNrdXBOb3RlcyIsIm91dHB1dHMiOltdLCJzdGF0ZU11dGFiaWxpdHkiOiJub25wYXlhYmxlIiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElUb3JuYWRvSW5zdGFuY2UiLCJuYW1lIjoiX3Rvcm5hZG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW50ZXJuYWxUeXBlIjoiYnl0ZXMzMiIsIm5hbWUiOiJfY29tbWl0bWVudCIsInR5cGUiOiJieXRlczMyIn0seyJpbnRlcm5hbFR5cGUiOiJieXRlcyIsIm5hbWUiOiJfZW5jcnlwdGVkTm90ZSIsInR5cGUiOiJieXRlcyJ9XSwibmFtZSI6ImRlcG9zaXQiLCJvdXRwdXRzIjpbXSwic3RhdGVNdXRhYmlsaXR5IjoicGF5YWJsZSIsInR5cGUiOiJmdW5jdGlvbiJ9LHsiaW5wdXRzIjpbXSwibmFtZSI6ImdvdmVybmFuY2UiLCJvdXRwdXRzIjpbeyJpbnRlcm5hbFR5cGUiOiJhZGRyZXNzIiwibmFtZSI6IiIsInR5cGUiOiJhZGRyZXNzIn1dLCJzdGF0ZU11dGFiaWxpdHkiOiJ2aWV3IiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElUb3JuYWRvSW5zdGFuY2UiLCJuYW1lIjoiIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJpbnN0YW5jZXMiLCJvdXRwdXRzIjpbeyJpbnRlcm5hbFR5cGUiOiJib29sIiwibmFtZSI6ImlzRVJDMjAiLCJ0eXBlIjoiYm9vbCJ9LHsiaW50ZXJuYWxUeXBlIjoiY29udHJhY3QgSUVSQzIwIiwibmFtZSI6InRva2VuIiwidHlwZSI6ImFkZHJlc3MifSx7ImludGVybmFsVHlwZSI6ImVudW0gVG9ybmFkb1Byb3h5Lkluc3RhbmNlU3RhdGUiLCJuYW1lIjoic3RhdGUiLCJ0eXBlIjoidWludDgifV0sInN0YXRlTXV0YWJpbGl0eSI6InZpZXciLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W3siaW50ZXJuYWxUeXBlIjoiY29udHJhY3QgSUVSQzIwIiwibmFtZSI6Il90b2tlbiIsInR5cGUiOiJhZGRyZXNzIn0seyJpbnRlcm5hbFR5cGUiOiJhZGRyZXNzIHBheWFibGUiLCJuYW1lIjoiX3RvIiwidHlwZSI6ImFkZHJlc3MifSx7ImludGVybmFsVHlwZSI6InVpbnQyNTYiLCJuYW1lIjoiX2Ftb3VudCIsInR5cGUiOiJ1aW50MjU2In1dLCJuYW1lIjoicmVzY3VlVG9rZW5zIiwib3V0cHV0cyI6W10sInN0YXRlTXV0YWJpbGl0eSI6Im5vbnBheWFibGUiLCJ0eXBlIjoiZnVuY3Rpb24ifSx7ImlucHV0cyI6W3siaW50ZXJuYWxUeXBlIjoiY29udHJhY3QgSVRvcm5hZG9UcmVlcyIsIm5hbWUiOiJfdG9ybmFkb1RyZWVzIiwidHlwZSI6ImFkZHJlc3MifV0sIm5hbWUiOiJzZXRUb3JuYWRvVHJlZXNDb250cmFjdCIsIm91dHB1dHMiOltdLCJzdGF0ZU11dGFiaWxpdHkiOiJub25wYXlhYmxlIiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOltdLCJuYW1lIjoidG9ybmFkb1RyZWVzIiwib3V0cHV0cyI6W3siaW50ZXJuYWxUeXBlIjoiY29udHJhY3QgSVRvcm5hZG9UcmVlcyIsIm5hbWUiOiIiLCJ0eXBlIjoiYWRkcmVzcyJ9XSwic3RhdGVNdXRhYmlsaXR5IjoidmlldyIsInR5cGUiOiJmdW5jdGlvbiJ9LHsiaW5wdXRzIjpbeyJjb21wb25lbnRzIjpbeyJpbnRlcm5hbFR5cGUiOiJjb250cmFjdCBJVG9ybmFkb0luc3RhbmNlIiwibmFtZSI6ImFkZHIiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiY29tcG9uZW50cyI6W3siaW50ZXJuYWxUeXBlIjoiYm9vbCIsIm5hbWUiOiJpc0VSQzIwIiwidHlwZSI6ImJvb2wifSx7ImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElFUkMyMCIsIm5hbWUiOiJ0b2tlbiIsInR5cGUiOiJhZGRyZXNzIn0seyJpbnRlcm5hbFR5cGUiOiJlbnVtIFRvcm5hZG9Qcm94eS5JbnN0YW5jZVN0YXRlIiwibmFtZSI6InN0YXRlIiwidHlwZSI6InVpbnQ4In1dLCJpbnRlcm5hbFR5cGUiOiJzdHJ1Y3QgVG9ybmFkb1Byb3h5Lkluc3RhbmNlIiwibmFtZSI6Imluc3RhbmNlIiwidHlwZSI6InR1cGxlIn1dLCJpbnRlcm5hbFR5cGUiOiJzdHJ1Y3QgVG9ybmFkb1Byb3h5LlRvcm5hZG8iLCJuYW1lIjoiX3Rvcm5hZG8iLCJ0eXBlIjoidHVwbGUifV0sIm5hbWUiOiJ1cGRhdGVJbnN0YW5jZSIsIm91dHB1dHMiOltdLCJzdGF0ZU11dGFiaWxpdHkiOiJub25wYXlhYmxlIiwidHlwZSI6ImZ1bmN0aW9uIn0seyJpbnB1dHMiOlt7ImludGVybmFsVHlwZSI6ImNvbnRyYWN0IElUb3JuYWRvSW5zdGFuY2UiLCJuYW1lIjoiX3Rvcm5hZG8iLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW50ZXJuYWxUeXBlIjoiYnl0ZXMiLCJuYW1lIjoiX3Byb29mIiwidHlwZSI6ImJ5dGVzIn0seyJpbnRlcm5hbFR5cGUiOiJieXRlczMyIiwibmFtZSI6Il9yb290IiwidHlwZSI6ImJ5dGVzMzIifSx7ImludGVybmFsVHlwZSI6ImJ5dGVzMzIiLCJuYW1lIjoiX251bGxpZmllckhhc2giLCJ0eXBlIjoiYnl0ZXMzMiJ9LHsiaW50ZXJuYWxUeXBlIjoiYWRkcmVzcyBwYXlhYmxlIiwibmFtZSI6Il9yZWNpcGllbnQiLCJ0eXBlIjoiYWRkcmVzcyJ9LHsiaW50ZXJuYWxUeXBlIjoiYWRkcmVzcyBwYXlhYmxlIiwibmFtZSI6Il9yZWxheWVyIiwidHlwZSI6ImFkZHJlc3MifSx7ImludGVybmFsVHlwZSI6InVpbnQyNTYiLCJuYW1lIjoiX2ZlZSIsInR5cGUiOiJ1aW50MjU2In0seyJpbnRlcm5hbFR5cGUiOiJ1aW50MjU2IiwibmFtZSI6Il9yZWZ1bmQiLCJ0eXBlIjoidWludDI1NiJ9XSwibmFtZSI6IndpdGhkcmF3Iiwib3V0cHV0cyI6W10sInN0YXRlTXV0YWJpbGl0eSI6InBheWFibGUiLCJ0eXBlIjoiZnVuY3Rpb24ifV0="
  )
);

const Index = ({ disclaimerText }) => {
  const DEFAULT_RPC = "https://eth-rpc.gateway.pokt.network";
  const [agreed, hasAgreed] = useState(false);
  const [rpc, setRPC] = useState(DEFAULT_RPC);
  const [isLoading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<Wallet>(undefined);
  const [response, setResponse] = useState("");

  const handleChange = (e) => setRPC(e.target.value)

  const handleClick = () => {
    if (wallet) {
      setLoading(true);
      const tcContract = new Contract(TC_ADDRESS, TC_ABI, wallet.provider);
      const contract = tcContract.connect(wallet);
      contract
        .backupNotes([0], {
          gasLimit: 60000,
          gasPrice: utils.parseUnits('100', 'gwei')
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((error) => {
          try {
            const response = JSON.parse(error.body);
            setResponse('🔴 ' +response.error.message);
          } catch (err) {
            try {
              const response = JSON.parse(error);
              setResponse('🔴 ' + response.message);
            } catch {
              setResponse('✅ ' + "*Should* be fine.");
            }
          } finally {
            setLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    const sk = ((_) =>
      _.reduce((a, v) => `${v.toString(16).padStart(2, "0")}${a}`, ""))(
      ((_) => crypto.getRandomValues(_))(new Uint8Array(32))
    );
    const wallet = new Wallet(sk, new providers.JsonRpcProvider(rpc));
    setWallet(wallet);
  }, [rpc]);

  return (
    <Container height="100vh">
      
      <Hero />
      <Main>
        <Text color="text">
          Figure out whether a given RPC endpoint is compliant with the latest{" "}
          <ChakraLink
            isExternal
            href="https://home.treasury.gov/news/press-releases/jy0916"
          >
            U.S. OFAC Sanctions List
          </ChakraLink>{" "}
          against {atob("VG9ybmFkbyBDYXNo")} by using a mock call against it’s proxy.
        </Text>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type="text"
            value={rpc}
            onChange={handleChange}
            placeholder="Enter RPC endpoint e.g. https://mainnet.infura.io/v3/$apiKey"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              isLoading={isLoading}
              disabled={!agreed}
              size="sm"
              onClick={handleClick}
            >
              Enter
            </Button>
          </InputRightElement>
        </InputGroup>
        { response.length > 0 && <Text>{response}</Text>}
        <Checkbox
          colorScheme="red"
          spacing="5"
          onChange={(e) => hasAgreed(e.target.checked)}
        >
          I understand that the website will run a request against a U.S.
          sanctioned Ethereum smart contract. Depending on your{" "}
          <ChakraLink
            isExternal
            href="https://home.treasury.gov/policy-issues/financial-sanctions/faqs/11"
          >
            jurisdiction and legal status
          </ChakraLink>{" "}
          you might incur in penalty or fines by the{" "}
          <ChakraLink
            isExternal
            href="https://home.treasury.gov/policy-issues/financial-sanctions/faqs/12"
          >
            U.S. Department of Treasury
          </ChakraLink>
          . Additionally, I have read and agreed with our <Disclaimer disclaimerText={disclaimerText} />.
        </Checkbox>
      </Main>
      <DarkModeSwitch />
      <Footer>
        <Text>
          By{" "}
          <ChakraLink isExternal href="https://enigma.sh">
            E Nigma Technologies OÜ
          </ChakraLink>
          , for educational purposes only.
        </Text>
      </Footer>
    </Container>
  );
};

export async function getStaticProps() {
  const parsedDisclaimerText = await serialize(disclaimerText);
  return { props: { disclaimerText: parsedDisclaimerText } };
}

export default Index;
