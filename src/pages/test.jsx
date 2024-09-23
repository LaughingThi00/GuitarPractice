// var Interval = useRef(null);
// var NowChordRef = useRef(null);

// const [HideForm, setHideForm] = useState(false);
// const handleHideForm = () => {
//   setHideForm(!HideForm);
// };
// const [HideDegree, setHideDegree] = useState(false);
// const handleHideDegree = () => {
//   setHideDegree(!HideDegree);
// };
// const [AllowRepeat, setAllowRepeat] = useState(false);
// const handleChangeAllowRepeat = () => {
//   setAllowRepeat(!AllowRepeat);
// };
// const [Content, setContent] = useState(ContentType.Custom);
// const handleChangeContent = () => {
//   switch (Content) {
//     case ContentType.Custom:
//       setContent(ContentType.TonicBased);
//       break;
//     case ContentType.TonicBased:
//       setContent(ContentType.HarmonyBased);
//       break;
//     case ContentType.HarmonyBased:
//       setContent(ContentType.Custom);
//       break;
//     default:
//       break;
//   }
// };
// const [ShowMenu, setShowMenu] = useState(false);
// const handleShowMenu = () => {
//   setShowMenu(!ShowMenu);
// };
// const [Mode, setMode] = useState(ModeType.Single);
// const handleChangeMode = () => {
//   if (Mode === ModeType.Single) {
//     setMode(ModeType.Multiple);

//     Interval.current = setInterval(() => {
//       if (!NowChordRef.current) {
//         setNowChord(Queue[0]);
//       } else {
//         let idx = Queue.findIndex(
//           (item) => item[2] === NowChordRef.current[2]
//         );

//         if (idx === -1 || idx === Queue.length - 1) {
//           setNowChord(Queue[0]);
//         } else {
//           setNowChord(Queue[idx + 1]);
//         }
//       }
//     }, IntervalChord);
//   } else {
//     setMode(ModeType.Single);
//     clearInterval(Interval.current);
//   }
// };
// const [Queue, setQueue] = useState([]);
// const handleClearQueue = () => {
//   setQueue([]);
// };
// const [ringOption, setRingOption] = useState(null);
// const handleChangeRingOption = (val) => {
//   if (!val) return;
//   setRingOption(val);
// };
// const [NowChord, setNowChord] = useState(null);
// const [IntervalChord, setIntervalChord] = useState(1000);
// useEffect(() => {
//   NowChordRef.current = NowChord;
// }, [NowChord]);

// const handleSliderIntervalChordChange = (event) => {
//   setIntervalChord(event.target.value);
//   clearInterval(Interval.current);
//   Interval.current = setInterval(() => {
//     if (!NowChordRef.current) {
//       setNowChord(Queue[0]);
//     } else {
//       let idx = Queue.findIndex((item) => item[0] === NowChordRef.current[0]);

//       if (idx === -1 || idx === Queue.length - 1) {
//         setNowChord(Queue[0]);
//       } else {
//         setNowChord(Queue[idx + 1]);
//       }
//     }
//   }, event.target.value);
// };
// const [toneOption, setToneOption] = useState(null);
// const handleChangeToneOption = (val) => {
//   if (!val) return;
//   setToneOption(val);
// };
// const [noteOption, setNoteOption] = useState(null);
// const handleChangeNoteOption = (val) => {
//   if (!val) return;
//   setNoteOption(val);
// };
// const [tonicOption, setTonicOption] = useState(null);
// const handleChangeTonicOption = (val) => {
//   if (!val) return;
//   setTonicOption(val);
// };
// const [harmonyOption, setHarmonyOption] = useState(null);
// const handleChangeHarmonyOption = (val) => {
//   if (!val) return;
//   setHarmonyOption(val);
// };
// const handleAdd = (chord) => {
//   if (!chord) return;
//   if (!Queue.find((item) => item[0] === chord)) {
//     if (
//       typeof chord === "string" &&
//       !Queue.includes((item) => item[0] === chord || item)
//     ) {
//       let AddingChord = pickFirstChordFromGroup(
//         List.find((item) => item[0] === chord)
//       );
//       if (AddingChord) {
//         const checkExist = Queue.find(
//           (item) => item[0].split(" ")[0] === chord
//         );
//         if (checkExist) return;

//         setQueue((prev) => [...prev, addTimestamp(AddingChord)]);
//         setNowChord(AddingChord);
//       }
//     }
//   }
// };
// const handleDelete = (chord) => {
//   if (!chord) return;
//   setQueue(Queue.filter((item) => item[2] !== chord[2]));
// };
// const handleShowAll = (chord) => {
//   if (!chord) return;
//   if (chord[0].includes("-")) chord[0] = chord[0].split("-")[1];
//   if (chord[0].includes(" ")) chord[0] = chord[0].split(" ")[0];
//   setQueue((prev) => {
//     const idx = prev.findIndex((mem) => mem[2] === chord[2]);
//     prev = prev.filter((item) => item[2] !== chord[2]);
//     return [
//       ...prev.slice(0, idx),
//       ...createGroupFromOneChord(List.find((item) => item[0] === chord[0])),
//       ...prev.slice(idx),
//     ];
//   });
// };
// const degreedChord = (chord: string): string => {
//   let res = chord;

//   if (Content === ContentType.HarmonyBased && toneOption) {
//     toneOption.value.forEach((item, index) => {
//       if (item === chord.split(" ")[0]) {
//         res = `${String(RomanNumerals.toRoman(index + 1))}-${chord}`;
//       }
//     });
//   }
//   return res;
// };
// const handleBuildChorSet = () => {
//   let res = null;
//   if (Content === ContentType.TonicBased) {
//     if (!tonicOption) {
//       return;
//     } else {
//       let chords = ChordSet.find(
//         (chords) => chords.name === tonicOption.value
//       );
//       if (!chords) return;
//       res = chords.set
//         .map((chord) =>
//           pickFirstChordFromGroup(
//             List.find((c) => c[0] === noteOption.value + chord)
//           )
//         )
//         .filter(Boolean);
//       if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
//       else setQueue(res);
//     }
//   } else if (Content === ContentType.HarmonyBased) {
//     if (!toneOption) return;
//     res = toneOption.value
//       .map((chord) =>
//         pickFirstChordFromGroup(List.find((c) => c[0] === chord))
//       )
//       .filter(Boolean);
//     if (AllowRepeat) setQueue((prev) => [...prev, ...res]);
//     else setQueue(res);
//   }
//   setNowChord(res[0]);
// };

// const handleChangeChordForm = (chord) => {
//   const chordOrigin = List.find((item) => item[0] === chord[0].split(" ")[0]);
//   const group = createGroupFromOneChord(chordOrigin);
//   let idx = group.findIndex((chrd) => chrd[0] === chord[0]);
//   if (idx === -1) return;
//   const next = findNext(group, idx);
//   idx = Queue.findIndex((item) => item[2] === chord[2]);
//   if (idx !== -1) {
//     Queue[idx] = next;
//     setQueue(Queue);
//     setNowChord(next);
//   }
// };
// const handleOnDragEnd = (result) => {
//   if (!result.destination) return;

//   const newItems = Array.from(Queue);
//   const [movedItem] = newItems.splice(result.source.index, 1);
//   newItems.splice(result.destination.index, 0, movedItem);

//   setQueue(newItems);
// };

// const ChordList = (
//   <datalist id="team_list">
//     {List.map((item, index) => {
//       return <option key={index} value={item[0]} />;
//     })}
//   </datalist>
// );

// const SettingPart = (
//   <div className="w-1/6 flex flex-column bg-blue-200">
//     <div>
//       <Button onClick={handleHideForm} variant="success">
//         HideForm: {String(HideForm)}
//       </Button>

//       <Button onClick={handleHideDegree} variant="success">
//         HideDegree: {String(HideDegree)}
//       </Button>

//       <Button variant="secondary" onClick={() => handleChangeContent()}>
//         {Content}
//       </Button>
//       <Button variant="secondary" onClick={() => handleChangeAllowRepeat()}>
//         {AllowRepeat ? "Repeated" : "Only"}
//       </Button>
//       {Content !== ContentType.Custom && (
//         <div>
//           <Select
//             options={
//               Content === ContentType.TonicBased ? optionsNote : optionsTone
//             }
//             placeholder={
//               Content === ContentType.TonicBased
//                 ? "Choose a note"
//                 : "Choose a tone"
//             }
//             onChange={
//               Content === ContentType.TonicBased
//                 ? handleChangeNoteOption
//                 : handleChangeToneOption
//             }
//             value={
//               Content === ContentType.TonicBased ? noteOption : toneOption
//             }
//             className="m-2"
//           />
//           <Select
//             options={
//               Content === ContentType.TonicBased
//                 ? optionsTonicBased
//                 : optionsHarmonyBased
//             }
//             onChange={
//               Content === ContentType.TonicBased
//                 ? handleChangeTonicOption
//                 : handleChangeHarmonyOption
//             }
//             value={
//               Content === ContentType.TonicBased ? tonicOption : harmonyOption
//             }
//             placeholder="Choose an option"
//             className="m-2"
//           />
//           <Button onClick={() => handleBuildChorSet()} variant="success">
//             <FontAwesomeIcon icon={faArrowsToDot} />{" "}
//           </Button>
//         </div>
//       )}
//     </div>
//   </div>
// );
// const ChordPart = (
//   <div className=" w-4/6 Chord-ImageBox flex justify-center items-center">
//     <div className="h-2/3 border-solid border-2 border-indigo-600">
//       {NowChord && createChordImage(NowChord, true, true)}
//     </div>
//     <div style={{ display: "flex", alignItems: "center" }}>
//       <label htmlFor="IntervalChord">IntervalChord: </label>
//       <input
//         id="IntervalChord"
//         type="range"
//         min="1000"
//         max="20000"
//         step="1000"
//         value={IntervalChord}
//         onChange={handleSliderIntervalChordChange}
//         style={{ margin: "0 10px", flexGrow: 1 }}
//       />
//       <span>{IntervalChord}</span>
//     </div>
//     <Button variant="secondary" onClick={() => handleChangeMode()}>
//       {Mode}
//     </Button>

//     <RisingBeat />
//   </div>
// );
// const ListPart = (
//   <div className="w-1/6 Chord-QueueScreen flex flex-column justify-start items-center p-2 ">
//     <div className="Chord-QueueList bg-blue-200">
//       <div className="my-4">
//         <input
//           placeholder="Choose a chord"
//           type="text"
//           name="team"
//           id="favorite_team"
//           list="team_list"
//           className="p-2 w-full border-gray-300 rounded"
//           onClick={(e) => handleAdd(e.currentTarget.value)}
//         />
//       </div>
//       <Button onClick={() => handleShowMenu()} variant="light">
//         <FontAwesomeIcon icon={faGear} />{" "}
//       </Button>
//       <Button onClick={() => handleClearQueue()} variant="light">
//         <FontAwesomeIcon icon={faBroom} />{" "}
//       </Button>

//       <Select
//         options={optionsRing}
//         placeholder="Choose a chord ring"
//         onChange={handleChangeRingOption}
//         value={ringOption}
//         className="m-2"
//       />
//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="playlist">
//           {(provided) => (
//             <ul
//               className=" w-4/5"
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {Queue &&
//                 Queue.map((item, index) => {
//                   const nameChord = degreedChord(item[0]);
//                   return (
//                     <Draggable
//                       key={item[2]}
//                       draggableId={item[2]}
//                       index={index}
//                     >
//                       {(provided) => (
//                         <li
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           style={{
//                             ...provided.draggableProps.style,
//                           }}
//                           className="Chord-QueueList-Item flex flex-row"
//                           key={item[2]}
//                         >
//                           <div
//                             className={
//                               NowChord && item[2] === NowChord[2]
//                                 ? "ChordItem ChordItemShowing"
//                                 : Queue.filter(
//                                     (itm) =>
//                                       itm[0].split(" ")[0] ===
//                                       item[0].split(" ")[0]
//                                   ).length >= 1 && item[0].includes("[")
//                                 ? "ChordItem ChordItemChosen "
//                                 : "ChordItem ChordItemGroup"
//                             }
//                             onClick={() => {
//                               setNowChord(item);
//                             }}
//                           >
//                             {nameChord.includes("-") ? (
//                               <div className="flex flex-column">
//                                 {!HideDegree && (
//                                   <h3 className="text-xs text-red-500">
//                                     {" "}
//                                     {nameChord.split("-")[0]}
//                                   </h3>
//                                 )}
//                                 <h3 className="text-2xl">
//                                   {" "}
//                                   {nameChord.split("-")[1].split(" ")[0]}
//                                 </h3>
//                                 {!HideForm &&
//                                   nameChord.split(" ").length > 1 && (
//                                     <h3 className="text-neutral-500">
//                                       {nameChord.split("-")[1].split(" ")[1]}
//                                     </h3>
//                                   )}
//                               </div>
//                             ) : (
//                               <div className="flex flex-column">
//                                 <h3 className="text-2xl">
//                                   {" "}
//                                   {nameChord.split(" ")[0]}
//                                 </h3>
//                                 {!HideForm &&
//                                   nameChord.split(" ").length > 1 && (
//                                     <h3 className="text-neutral-500">
//                                       {nameChord.split(" ")[1]}
//                                     </h3>
//                                   )}
//                               </div>
//                             )}
//                           </div>
//                           {ShowMenu && (
//                             <div className="Chord-Menu flex flex-column">
//                               <Button
//                                 onClick={() => handleDelete(item)}
//                                 variant="danger"
//                                 className="p-2 text-xl flex items-center justify-center "
//                               >
//                                 <FontAwesomeIcon icon={faTrash} />{" "}
//                               </Button>
//                               <Button
//                                 variant="info"
//                                 className="p-2 text-xl flex items-center justify-center "
//                                 onClick={() => handleChangeChordForm(item)}
//                               >
//                                 <FontAwesomeIcon icon={faAnglesRight} />{" "}
//                               </Button>
//                               {Content === ContentType.Custom && (
//                                 <Button
//                                   variant="light"
//                                   className="p-2 text-xl flex items-center justify-center "
//                                   onClick={() => handleShowAll(item)}
//                                 >
//                                   <FontAwesomeIcon icon={faPlus} />{" "}
//                                 </Button>
//                               )}
//                             </div>
//                           )}
//                         </li>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   </div>
// );