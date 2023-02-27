import { Stepper } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import LoadCircle from '../ui/LoadCircle';

function ConfirmModal({ sizes, close }) {

  const [active, setActive] = useState(0);
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = active === 3 ? null : () => setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    takeScreenshot()
  }, [])

  console.log("image1", image1)
  console.log("image2", image2)

  function takeScreenshot() {
    const options = {
      allowTaint: true,
      foreignObjectRendering: true,
    }
    html2canvas(document.getElementById("front-preview"), options)
      .then((canvas) => {
        canvas.style.width = '300px';
        canvas.style.height = '300px';
        canvas.toDataURL('image/png')
        canvas.toBlob((blob) => {
          setImage1(blob);
        }, "image/png", 1);
        // setImage1(canvas.toDataURL('image/png'));
        // document.getElementById('output1').appendChild(canvas);
      })
    html2canvas(document.getElementById("back-preview"), options)
      .then((canvas) => {
        canvas.style.width = '300px';
        canvas.style.height = '300px';
        setImage2(canvas.toDataURL('image/png'))
        // document.getElementById('output2').appendChild(canvas);
      })
  }

  return (
    <>
      <div className='flexbox-column white-background full-width' style={{ padding: 20 }}>
        <Stepper style={{ width: 500 }} color="grey" size="md" active={active}>
          <Stepper.Step label="Step 1" description="Verify Design" color="grey" />
          <Stepper.Step label="Step 2" description="Tags" color="grey" />
          <Stepper.Step label="Step 3" description="Upload" color="grey" />
        </Stepper>

        <AnimatePresence>
          {
            active === 0 &&
            <motion.div
              key={0}
              className='flexbox-row'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.50 }}
            >
              {/* <div id="output1" style={{ width: 300, height: 300 }}></div> */}
              <img src={image1} style={{ width: 300, height: 300 }} />
              <img src={image2} style={{ width: 300, height: 300 }} />
              {/* <div id="output2" style={{ width: 300, height: 300 }}></div> */}
            </motion.div>
          }
          {
            active === 1 &&
            <motion.div
              key={1}
              className='flexbox-column full-width'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.50 }}
            >
              <h2 className='grey-text'>Tags</h2>
              {
                sizes.map((size) => {
                  return (
                    <div className='grey-text full-width'>{size.size_id}</div>
                  )
                })
              }
            </motion.div>
          }
          {
            active === 3 &&
            <motion.div
              key={1}
              className='flexbox-row'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.50 }}
            >
              <h2 className='grey-text'>Uploaded!</h2>
            </motion.div>
          }
        </AnimatePresence>


        {
          active === 3 ?
            <button onClick={close} className='red-background'>close</button> :
            <div className='flexbox-row margin-left' style={{ gap: 5 }}>
              <div className='grey-text'>{active}</div>
              <button className="grey-background" onClick={prevStep}>back</button>
              <button className="grey-background" onClick={nextStep}>Next</button>
            </div>
        }

      </div>
    </>
  );
}

export default ConfirmModal;