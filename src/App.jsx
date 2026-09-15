import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.png';
import lidlLogo from './assets/lidl-logo.png';
import rewelogo from './assets/rewe-logo.png';
import aldilogo from './assets/aldi-logo.png';

import { 
  Globe, 
  Eye, 
  HelpCircle, 
  Bell, 
  Search, 
  Mic, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Home, 
  Box, 
  Star, 
  User, 
  ArrowUpRight, 
  PieChart, 
  ArrowLeft,
  FileText,
  Clock,
  Scissors,
  Edit3,
  Camera,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function SparkasseApp() {
  const [activeTab, setActiveTab] = useState('Start');
  const [currentScreen, setCurrentScreen] = useState('pinLogin'); 
  const [pinValue, setPinValue] = useState('');
  const [pinError, setPinError] = useState(false);
  const [savePin, setSavePin] = useState(false);

  const [showBanner, setShowBanner] = useState(true);
  const [accountsExpanded, setAccountsExpanded] = useState(true);
  const [transactionsExpanded, setTransactionsExpanded] = useState(true);

  // Selected transaction state for details screen
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [additionalInfoExpanded, setAdditionalInfoExpanded] = useState(false);

  // Money Transfer Flow States
  const [transferForm, setTransferForm] = useState({
    recipient: '',
    iban: '',
    amount: '',
    reference: ''
  });
  const [transferError, setTransferError] = useState('');

  // Helper to render brand or custom transaction icons based on images
  const renderTransactionIcon = (txName) => {
    if (txName.includes('OTTO')) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#e30613] flex-shrink-0 flex items-center justify-center text-white font-black text-[10px] tracking-tighter shadow-sm">
          OTTO
        </div>
      );
    }
    if (txName.includes('AMAZON') || txName.includes('AMZN')) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#121212] border border-gray-700 flex-shrink-0 flex items-center justify-center text-white font-bold text-[9px] shadow-sm">
          <span className="text-[#ff9900] font-black text-xs">a</span>
        </div>
      );
    }
    if (txName.includes('LIDL')) {
      return (
        <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-700 shadow-sm">
          <img src={lidlLogo} alt="LIDL" className="w-full h-full object-contain p-1" />
        </div>
      );
    }
    if (txName.includes('REWE')) {
      return (
        <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-700 shadow-sm">
          <img src={rewelogo} alt="REWE" className="w-full h-full object-contain p-1" />
        </div>
      );
    }
    if (txName.includes('ALDI')) {
      return (
        <div className="w-8 h-8 rounded-full bg-white flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-700 shadow-sm">
          <img src={aldilogo} alt="ALDI" className="w-full h-full object-contain p-1" />
        </div>
      );
    }
    if (txName.includes('VHV')) {
      return (
        <div className="w-8 h-8 rounded-full bg-[#1c1c1e] border border-gray-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-[8px] shadow-sm">
          VHV
        </div>
      );
    }
    if (txName.includes('DISKONT')) {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-600 flex-shrink-0 flex items-center justify-center text-gray-300 shadow-sm">
          ⛽
        </div>
      );
    }
    // Default dashed circle placeholder as seen in Sparkasse app for regular transfers
    return (
      <div className="w-8 h-8 rounded-full border border-gray-600 border-dashed flex-shrink-0 flex items-center justify-center mt-0.5"></div>
    );
  };

  // Chronologically ordered transactions extracted from the uploaded images stored in state
  const initialTransactions = [
    {
      id: 'tx-34',
      date: '14.09.2026',
      name: 'Ioan-Mircea Jebelean, Cristina-Ecaterina Jebelean',
      shortName: 'Ioan-Mircea Jebelean Cristina-Ecaterina Jebelean',
      reference: 'DATUM 14.09.2026, 14:18 UHR',
      amountNum: -4.55,
      amountStr: '-4,55 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '30.08.2026',
      valueDate: '30.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-1',
      date: '14.09.2026',
      name: 'Ioan-Mircea Jebelean, Cristina-Ecaterina Jebelean',
      shortName: 'Ioan-Mircea Jebelean Cristina-Ecaterina Jebelean',
      reference: 'saltea,telef,baterie',
      amountNum: 120.00,
      amountStr: '120,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '14.09.2026',
      valueDate: '14.09.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
     {
      id: 'tx-25',
      date: '11.09.2026',
      name: 'LIDL SAGT DANKE/Triftplatz 6/Sch.nau...',
      shortName: 'LIDL SAGT DANKE/Triftplatz 6/Schönau',
      reference: '2026-09-11T12:48 Debitk.0 2028-12',
      amountNum: -56.23,
      amountStr: '-56,23 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '11.09.2026',
      valueDate: '11.09.2026',
      iban: 'DE55 7105 0000 0011 2233',
      bic: 'BYLADEM1BGL',
      category: 'Groceries'
    },
     {
      id: 'tx-26',
      date: '11.09.2026',
      name: 'REWE SAGT DANKE/Triftplatz 6/Sch.nau...',
      shortName: 'REWE SAGT DANKE/Triftplatz 6/Schönau',
      reference: '2026-09-11T12:59 Debitk.0 2028-12',
      amountNum: -8.51,
      amountStr: '-8,51 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '11.09.2026',
      valueDate: '11.09.2026',
      iban: 'DE41 3005 0000 0001 4843 10',
      bic: 'WELADEDDXXX',
      category: 'Groceries'
    },
     {
      id: 'tx-2',
      date: '10.09.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052934364682 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '10.09.2026',
      valueDate: '10.09.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-3',
      date: '10.09.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052934365508 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '10.09.2026',
      valueDate: '10.09.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
     {
      id: 'tx-32',
      date: '09.09.2026',
      name: 'Höffler Berchtesgaden GmbH / Berchtesgaden/DE',
      shortName: '',
      reference: '2026-09-09T09:36 Debitk.0 2028-12',
      amountNum: -56.26,
      amountStr: '-56,26 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '09.09.2026',
      valueDate: '09.09.2026',
      iban: 'DE33 3005 0000 0001 1397 16',
      bic: 'WELADEDDXXX',
      category: 'Groceries'
    },
     {
      id: 'tx-24',
      date: '08.09.2026',
      name: 'ALDI SE U. CO. KG/REICHENHALLER STR. 16/BISCHOFSWIESEN/DE',
      shortName: '',
      reference: '2026-09-08T09:36 Debitk.0 2028-12',
      amountNum: -33.46,
      amountStr: '-33,46 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '08.09.2026',
      valueDate: '08.09.2026',
      iban: 'DE33 3005 0000 0001 1397 16',
      bic: 'WELADEDDXXX',
      category: 'Groceries'
    },
      {
      id: 'tx-23',
      date: '05.09.2026',
      name: 'BURGER FAMILY SZG GmbH / SALZBURG/AT',
      shortName: '',
      reference: '2026-09-05T19:36 Debitk.0 2028-12',
      amountNum: -53.82,
      amountStr: '-53,82 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '05.09.2026',
      valueDate: '05.09.2026',
      iban: 'AT84 5006 04000 0012 0208 02',
      bic: 'GENODEFFXXX',
      category: 'Groceries'
    },
   
    {
      id: 'tx-4',
      date: '03.09.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052774787410 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '03.09.2026',
      valueDate: '03.09.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-22',
      date: '03.09.2026',
      name: 'ALDI SE U. CO. KG/REICHENHALLER STR. 16/BISCHOFSWIESEN/DE',
      shortName: '',
      reference: '2026-09-03T09:36 Debitk.0 2028-12',
      amountNum: -41.66,
      amountStr: '-41,66 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '03.09.2026',
      valueDate: '03.09.2026',
      iban: 'DE33 3005 0000 0001 1397 16',
      bic: 'WELADEDDXXX',
      category: 'Groceries'
    },
    {
      id: 'tx-5',
      date: '02.09.2026',
      name: 'OTTO Payments GmbH',
      shortName: 'OTTO Payments GmbH',
      reference: 'Deine Bestellung vom 29.11.25. Rechnung R-DE-340596305-2025-31019724. Rate 9 von 12. CAB-RKP-KZB-FX2 - OTTO Payments GmbH',
      amountNum: -80.45,
      amountStr: '-80,45 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '02.09.2026',
      valueDate: '02.09.2026',
      iban: 'DE12 3456 7890 1234 5678',
      bic: 'OTTODEM1XXX',
      category: 'Shopping'
    },
     {
      id: 'tx-29',
      date: '01.09.2026',
      name: 'BK TS BErchtesgaden // Berchtesgaden/DE',
      shortName: '',
      reference: '2026-09-01T07:24 Debitk.0 2028-12',
      amountNum: -40.25,
      amountStr: '-40,25 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '01.09.2026',
      valueDate: '01.09.2026',
      iban: 'DE53 3005 0000 0055 0000 61',
      bic: 'WELADEDDXXX',
      category: 'Unassigned'
    },
    { 
      id: 'tx-30',
      date: '31.08.2026',
      name: 'SB-EINZAHLUNG REC MARKTS GA 2235',
      shortName: 'SB-NACHZAHLUNG REC BISCHOFSWIESEN GA 2235',
      reference: 'SB-NACHZAHLUNG REC BISCHOFSWIESEN GA 2235 / 31.08.26 08.20.150020508149 / 2812 /0 / 0',
      amountNum: -28.68,
      amountStr: '-28,68 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '31.08.2026',
      valueDate: '31.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-6',
      date: '31.08.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052702215471 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '31.08.2026',
      valueDate: '31.08.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-18',
      date: '30.08.2026',
      name: 'Ioan-Mircea Jebelean, Cristina-Ecaterina Jebelean',
      shortName: 'Ioan-Mircea Jebelean Cristina-Ecaterina Jebelean',
      reference: 'mama',
      amountNum: -500.00,
      amountStr: '-500,00 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '30.08.2026',
      valueDate: '30.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-8',
      date: '27.08.2026',
      name: 'AMAZON EU S.A R.L., NIEDERLASSUNG...',
      shortName: 'AMAZON EU S.A R.L., NIEDERLASSUNG',
      reference: '302-0328883-2745945 Amazon.de 5DG65BYH65TWO7X9',
      amountNum: -12.58,
      amountStr: '-12,58 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '27.08.2026',
      valueDate: '27.08.2026',
      iban: 'DE33 1234 5678 9012 3456',
      bic: 'AMZNDE33XXX',
      category: 'Shopping'
    },
    {
      id: 'tx-9',
      date: '27.08.2026',
      name: 'AMAZON EU S.A R.L., NIEDERLASSUNG...',
      shortName: 'AMAZON EU S.A R.L., NIEDERLASSUNG',
      reference: 'D01-7837434-9893422 AMZNPrime DE 4FPT5Q2TIEOI5KT6',
      amountNum: -8.99,
      amountStr: '-8,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '27.08.2026',
      valueDate: '27.08.2026',
      iban: 'DE33 1234 5678 9012 3456',
      bic: 'AMZNDE33XXX',
      category: 'Subscription'
    },
    {
      id: 'tx-10',
      date: '26.08.2026',
      name: 'Ioan-Mircea Jebelean, Cristina-Ecaterina Jebelean',
      shortName: 'Ioan-Mircea Jebelean Cristina-Ecaterina Jebelean',
      reference: 'televizor',
      amountNum: 50.00,
      amountStr: '50,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '26.08.2026',
      valueDate: '26.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-2b',
      date: '24.08.2026',
      name: 'Sony DADC Europe GmbH',
      shortName: 'Sony DADC',
      reference: 'LOHN 07.26',
      amountNum: 2805.00,
      amountStr: '2805,00 €',
      isPositive: true,
      accountSource: 'Girokonto AUSTRIA GmbH',
      postingDate: '24.08.2026',
      valueDate: '24.08.2026',
      iban: 'AT61 1904 3002 3456 7891',
      bic: 'ERSTEATWXXX',
      category: 'Income'
    },
    {
      id: 'tx-11',
      date: '19.08.2026',
      name: 'DISKONT 4011/Alpenstrasse 102/Anif/...',
      shortName: 'DISKONT 4011/Alpenstrasse 102/Anif',
      reference: '2026-08-17T07:34 Debitk.0 2028-12 Zahl.System DebitMastercard',
      amountNum: -50.00,
      amountStr: '-50,00 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '19.08.2026',
      valueDate: '19.08.2026',
      iban: 'AT44 1234 5678 9012 3456',
      bic: 'ATBKATWWXXX',
      category: 'Fuel'
    },
    {
      id: 'tx-12',
      date: '18.08.2026',
      name: 'LIDL SAGT DANKE/Triftplatz 6/Sch.nau...',
      shortName: 'LIDL SAGT DANKE/Triftplatz 6/Schönau',
      reference: '2026-08-17T07:58 Debitk.0 2028-12',
      amountNum: -10.79,
      amountStr: '-10,79 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '18.08.2026',
      valueDate: '18.08.2026',
      iban: 'DE55 7105 0000 0011 2233',
      bic: 'BYLADEM1BGL',
      category: 'Groceries'
    },
    { 
      id: 'tx-27-b',
      date: '18.08.2026',
      name: 'SB-EINZAHLUNG REC MARKTS GA 2235',
      shortName: 'SB-EINZAHLUNG REC MARKTS GA 2235',
      reference: 'SB-EINZAHLUNG REC MARKTS GA 2235 / 17.08.26 07.20.150020508149 / 2812 /0 / 0',
      amountNum: 150.00,
      amountStr: '150,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '18.08.2026',
      valueDate: '18.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-13',
      date: '13.08.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052305761979 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '13.08.2026',
      valueDate: '13.08.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-14',
      date: '13.08.2026', 
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052305856369 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '13.08.2026',
      valueDate: '13.08.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-15',
      date: '11.08.2026',
      name: 'AMAZON EU S.A R.L., NIEDERLASSUNG...',
      shortName: 'AMAZON EU S.A R.L., NIEDERLASSUNG',
      reference: '304-6844457-8510731 AMZN-Ratenzahlung 204GVOFDJHJQ0L1B',
      amountNum: -21.17,
      amountStr: '-21,17 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '11.08.2026',
      valueDate: '11.08.2026',
      iban: 'DE33 1234 5678 9012 3456',
      bic: 'AMZNDE33XXX',
      category: 'Shopping'
    },
    {
      id: 'tx-21-b',
      date: '07.08.2026',
      name: 'Cirstov Ana Maria',
      shortName: '',
      reference: 'Vacanta',
      amountNum: -850.00,
      amountStr: '-850,00 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '07.08.2026',
      valueDate: '07.08.2026',
      iban: 'RO27 BTRL 0440 1205 6789 0101',
      bic: 'BTRLRORUXXX',
      category: 'Transfer'
    },
    {
      id: 'tx-16',
      date: '06.08.2026',
      name: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      shortName: 'PayPal (Europe) S.a r.l. et Cie, S.C.A.',
      reference: '1052149989874 PP.2179.PP . PayPal (Europe) S.a r.l. et Cie, SCA, Ihr Einkauf bei PayPal (Europe) S.a r.l. et Cie, SCA',
      amountNum: -9.99,
      amountStr: '-9,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '06.08.2026',
      valueDate: '06.08.2026',
      iban: 'LU35 0001 1223 3445 5667',
      bic: 'PYPLXXXXLUX',
      category: 'Shopping'
    },
    {
      id: 'tx-27',
      date: '05.08.2026',
      name: 'SB-EINZAHLUNG REC MARKTS GA 2235',
      shortName: 'SB-EINZAHLUNG REC MARKTS GA 2235',
      reference: 'SB-EINZAHLUNG REC MARKTS GA 2235 / 17.08.26 07.20.150020508149 / 2812 /0 / 0',
      amountNum: 500.00,
      amountStr: '500,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '05.08.2026',
      valueDate: '05.08.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-17',
      date: '03.08.2026',
      name: 'AMAZON PAYMENTS EUROPE S.C.A.',
      shortName: 'AMAZON PAYMENTS EUROPE S.C.A.',
      reference: '302-9993784-4789921 AMZN Mktp DE 1KHXJ1F1UGHK2UZF',
      amountNum: -7.99,
      amountStr: '-7,99 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '03.08.2026',
      valueDate: '03.09.2026',
      iban: 'LU88 1234 5678 9012 3456',
      bic: 'AMZPLU2XXX',
      category: 'Shopping'
    },
    {
      id: 'tx-18-b',
      date: '01.08.2026',
      name: 'Andrei Jebelan ',
      shortName: '',
      reference: 'Datum 01.08.2026, 12:00 Uhr',
      amountNum: -1000.00,
      amountStr: '-1.000,00 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '01.08.2026',
      valueDate: '01.08.2026',
      iban: 'LT51 3250 0750 9642 3719',
      bic: 'REVOLT21XXX',
      category: 'Unassigned'
    },
    {
      id: 'tx-19',
      date: '31.08.2026',
      name: 'SPORT RENOTH GMBH ',
      shortName: '',
      reference: 'LOHN / GEHALT 08/26',
      amountNum: 250.00,
      amountStr: '250,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '31.08.2026',
      valueDate: '31.08.2026',
      iban: 'DE60 7105 0000 0020 7128 40',
      bic: 'BLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-21-c',
      date: '31.07.2026',
      name: 'SPORT RENOTH GMBH ',
      shortName: '',
      reference: 'LOHN / GEHALT 07/26',
      amountNum: 151.00,
      amountStr: '151,00 €',
      isPositive: true,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '31.07.2026',
      valueDate: '31.07.2026',
      iban: 'DE60 7105 0000 0020 7128 40',
      bic: 'BLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-20',
      date: '30.07.2026',
      name: 'Ioan-Mircea Jebelean, Cristina-Ecaterina Jebelean',
      shortName: 'Ioan-Mircea Jebelean Cristina-Ecaterina Jebelean',
      reference: 'mama',
      amountNum: -500.00,
      amountStr: '-500,00 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '30.07.2026',
      valueDate: '30.07.2026',
      iban: 'DE22 7105 0000 0020 3053 48',
      bic: 'BYLADEM1BGL',
      category: 'Unassigned'
    },
    {
      id: 'tx-7',
      date: '28.07.2026',
      name: 'VHV Allgemeine Versicherung AG',
      shortName: 'VHV Allgemeine Versicherung AG',
      reference: 'K878-631293/3 DFCG DATUM 28.07.2026, 13.07 UHR',
      amountNum: -202.18,
      amountStr: '-202,18 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '27.07.2026',
      valueDate: '27.07.2026',
      iban: 'DE98 7654 3210 9876 5432',
      bic: 'VHVDEM1XXX',
      category: 'Insurance'
    },
    {
      id: 'tx-21-d',
      date: '31.08.2026',
      name: 'LIDL SAGT DANKE/Triftplatz 6/Sch.nau...',
      shortName: 'LIDL SAGT DANKE/Triftplatz 6/Schönau',
      reference: '2026-08-31T07:58 Debitk.0 2028-12',
      amountNum: -57.23,
      amountStr: '-57,23 €',
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '31.08.2026',
      valueDate: '31.08.2026',
      iban: 'DE55 7105 0000 0011 2233',
      bic: 'BYLADEM1BGL',
      category: 'Groceries'
    }
  ];

  const [transactions, setTransactions] = useState(initialTransactions);

  // Helper to format numbers into German currency style (e.g., 12.530,19 €)
  const formatCurrency = (num) => {
    const parts = num.toFixed(2).split('.');
    let integerPart = parts[0];
    const decimalPart = parts[1];
    
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${integerPart},${decimalPart} €`;
  };

  // Compute cumulative balances chronologically starting from 15.034,33 € (oldest to newest)
  const startingBalance = 15034.33;
  
  const chronologicalTx = [...transactions].reverse();
  let runningSum = startingBalance;
  const processedChronological = chronologicalTx.map((tx) => {
    runningSum += tx.amountNum;
    return {
      ...tx,
      computedBalance: runningSum,
      formattedBalance: formatCurrency(runningSum)
    };
  });
  const evaluatedTransactions = processedChronological.reverse();

  const [activeHeaderBalance, setActiveHeaderBalance] = useState(evaluatedTransactions[0]?.formattedBalance || '0,00 €');
  const [activeHeaderDate, setActiveHeaderDate] = useState(evaluatedTransactions[0]?.date || '14.09.2026');
  
  const transactionItemRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;

    let closestTx = evaluatedTransactions[0];
    let minDistance = Infinity;

    transactionItemRefs.current.forEach((el, idx) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop);
        if (distance < minDistance) {
          minDistance = distance;
          closestTx = evaluatedTransactions[idx];
        }
      }
    });

    if (closestTx) {
      setActiveHeaderBalance(closestTx.formattedBalance);
      setActiveHeaderDate(closestTx.date);
    }
  };

  const handlePinSubmit = () => {
    if (pinValue === '20011') {
      setPinError(false);
      setCurrentScreen('home');
    } else {
      setPinError(true);
    }
  };

  const openTransactionDetail = (tx) => {
    setSelectedTransaction(tx);
    setCurrentScreen('transactionDetail');
  };

  // Transfer flow validation and execution handler
  const handleTransferSubmit = (e) => {
    e.preventDefault();
    if (!transferForm.recipient || !transferForm.iban || !transferForm.amount) {
      setTransferError('Please fill out all required fields.');
      return;
    }
    setTransferError('');
    setCurrentScreen('sendMoneyReview');
  };

  const handleExecuteTransfer = () => {
    const rawAmount = parseFloat(transferForm.amount.replace(',', '.')) || 0;
    const newTx = {
      id: `tx-transfer-${Date.now()}`,
      date: '14.09.2026',
      name: transferForm.recipient,
      shortName: transferForm.recipient,
      reference: transferForm.reference || 'Online Transfer',
      amountNum: -Math.abs(rawAmount),
      amountStr: `-${rawAmount.toFixed(2).replace('.', ',')} €`,
      isPositive: false,
      accountSource: 'Girokonto XTENSION über 18',
      postingDate: '14.09.2026',
      valueDate: '14.09.2026',
      iban: transferForm.iban,
      bic: 'BYLADEM1BGL',
      category: 'Transfer'
    };

    setTransactions([newTx, ...transactions]);
    setCurrentScreen('sendMoneySuccess');
  };

  const groupedTransactions = evaluatedTransactions.reduce((acc, tx) => {
    if (!acc[tx.date]) {
      acc[tx.date] = [];
    }
    acc[tx.date].push(tx);
    return acc;
  }, {});

  return (
    <div className="bg-black min-h-screen flex justify-center items-center font-sans text-gray-100 select-none">
      <div className="w-[440px] h-[956px] bg-[#121212] flex flex-col justify-between relative overflow-hidden shadow-2xl rounded-none border border-[#2c2c2e]">
        
        {currentScreen === 'pinLogin' && (
          <div className="flex-1 flex flex-col justify-between px-6 py-6 bg-[#121212]">
            <div>
              <div className="flex justify-between items-center mb-8 pt-2">
                <span className="text-sm font-medium text-gray-200 tracking-tight">PIN entry required</span>
                <X className="w-5 h-5 text-gray-400 cursor-pointer" />
              </div>

              <div className="text-center space-y-1 mb-8">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-[#1c1c1e] shadow-lg border border-gray-700">
                    <img src={logo} alt="Sparkasse Logo" className="w-full h-full object-cover" />
                  </div>
                </div>
                <h2 className="text-base font-semibold text-gray-100">Sparkasse Berchtesgadener Land</h2>
                <p className="text-xs text-gray-400">7946607996096426</p>
                <p className="text-xs text-gray-300 pt-3">Enter your online banking PIN for the login name above</p>
              </div>

              <div className="space-y-3">
                <div className={`relative flex items-center bg-[#1c1c1e] border ${pinError ? 'border-red-500' : 'border-gray-600'} rounded-xl px-4 py-3.5`}>
                  <input 
                    type="password"
                    value={pinValue}
                    onChange={(e) => { setPinValue(e.target.value); setPinError(false); }}
                    onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                    placeholder="Online-Banking PIN"
                    className="w-full bg-transparent text-gray-100 text-sm placeholder-gray-500 focus:outline-none tracking-widest"
                  />
                </div>
                {pinError && (
                  <p className="text-xs text-red-500 text-center font-medium">Incorrect PIN. Try 20011</p>
                )}

                <div className="flex justify-between items-center pt-3 px-1">
                  <span className="text-xs text-gray-300">Save online banking PIN</span>
                  <button 
                    onClick={() => setSavePin(!savePin)}
                    className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${savePin ? 'bg-[#34c759]' : 'bg-[#3a3a3c]'}`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${savePin ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pb-6">
              <button 
                onClick={handlePinSubmit}
                className="w-full bg-[#e30613] hover:bg-red-700 text-white font-bold py-3.5 rounded-full text-sm shadow-md transition-colors"
              >
                Confirm
              </button>
              <button 
                onClick={() => setPinValue('')}
                className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-gray-200 font-bold py-3.5 rounded-full text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'home' && (
          <>
            <div className="px-4 py-3 flex items-center justify-between bg-[#121212] border-b border-transparent z-10">
              <div className="flex items-center space-x-4 text-gray-300">
                <Globe className="w-5 h-5 cursor-pointer" />
                <Eye className="w-5 h-5 cursor-pointer" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[#1c1c1e] border border-gray-700">
                <img src={logo} alt="Sparkasse Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center space-x-4 text-gray-300">
                <HelpCircle className="w-5 h-5 cursor-pointer" />
                <div className="relative">
                  <Bell className="w-5 h-5 cursor-pointer" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-none">
              
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Areas:</span>
                <button className="border border-gray-600 rounded-full px-4 py-1 text-xs font-medium text-gray-200 bg-[#1c1c1e]">
                  Invest
                </button>
              </div>

              <div className="relative flex items-center">
                <Search className="absolute left-3.5 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="What would you like to do?" 
                  className="w-full bg-[#2c2c2e] text-gray-200 pl-10 pr-10 py-2.5 rounded-xl text-sm placeholder-gray-400 focus:outline-none"
                />
                <Mic className="absolute right-3.5 w-4 h-4 text-gray-400 cursor-pointer" />
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-semibold text-gray-200">Shortcuts</span>
                <span className="text-xs text-[#0a84ff] font-medium cursor-pointer">Show all</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div onClick={() => setCurrentScreen('sendMoneyForm')} className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <ArrowUpRight className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Send Money</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <Search className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Search transactions</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#f6f253] flex items-center justify-center text-black font-extrabold tracking-tighter text-xs shadow-md">
                    wero
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Use Wero</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <PieChart className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Financial planner</span>
                </div>
              </div>

              {showBanner && (
                <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-2xl p-4 relative shadow-md">
                  <button 
                    onClick={() => setShowBanner(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex space-x-3 items-start">
                    <div className="w-16 h-16 bg-[#2c2c2e] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                      <div className="relative w-full h-full bg-[#121212] rounded-lg flex flex-col items-center justify-center">
                        <div className="w-3 h-6 bg-red-600 absolute bottom-2 left-5 rounded-xs"></div>
                        <div className="w-2 h-4 bg-blue-500 absolute bottom-2 left-3 rounded-xs"></div>
                        <div className="w-2 h-8 bg-blue-400 absolute bottom-2 right-3 rounded-xs"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-100 leading-snug pr-4">Finances: I'm the professional</h3>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        What am I spending my money on? How will my account balance change? The financial planner reveals all this and more.
                      </p>
                      <button className="text-xs text-[#0a84ff] font-semibold mt-2.5 block">
                        Activate now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden border border-[#2c2c2e]">
                <div 
                  onClick={() => setAccountsExpanded(!accountsExpanded)}
                  className="px-4 py-3.5 flex justify-between items-center cursor-pointer bg-[#1c1c1e]"
                >
                  <div className="flex items-center space-x-2">
                    {accountsExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm font-bold text-gray-100">Accounts and cards</span>
                  </div>
                  <span className="text-sm font-semibold text-[#8ea97a]">{evaluatedTransactions[0].formattedBalance}</span>
                </div>

                {accountsExpanded && (
                  <div 
                    onClick={() => setCurrentScreen('accountDetail')}
                    className="border-t border-[#2c2c2e] px-4 py-3.5 space-y-3 bg-[#161618] cursor-pointer hover:bg-[#1f1f22] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-3 items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-[#1c1c1e] border border-gray-700 flex-shrink-0">
                          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-100">Girokonto XTENSION über 18</h4>
                          <p className="text-[10px] text-gray-400 tracking-tight">DE45 7105 0000 0020 5081 49</p>
                          <p className="text-[10px] text-gray-400">Andrei-Ionel Jebelean</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end items-center space-x-3 pt-1">
                      <span className="text-xs font-semibold text-[#8ea97a]">{evaluatedTransactions[0].formattedBalance}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden border border-[#2c2c2e]">
                <div 
                  onClick={() => setTransactionsExpanded(!transactionsExpanded)}
                  className="px-4 py-3.5 flex justify-between items-center cursor-pointer bg-[#1c1c1e]"
                >
                  <div className="flex items-center space-x-2">
                    {transactionsExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    <span className="text-sm font-bold text-gray-100">Recent transactions</span>
                  </div>
                </div>

                {transactionsExpanded && (
                  <div className="divide-y divide-[#2c2c2e] text-xs">
                    {evaluatedTransactions.slice(0, 2).map((tx) => (
                      <div 
                        key={tx.id}
                        onClick={() => openTransactionDetail(tx)}
                        className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-[#252528] transition-colors"
                      >
                        <div className="flex items-start space-x-3 pr-2">
                          {renderTransactionIcon(tx.name)}
                          <div>
                            <p className="font-semibold text-gray-200 truncate max-w-[210px]">{tx.name}</p>
                            <p className="text-[10px] text-gray-400 truncate max-w-[210px]">{tx.reference}</p>
                            <p className="text-[10px] text-gray-500">{tx.accountSource}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-xl font-bold text-sm tracking-tight whitespace-nowrap shadow-sm ${tx.isPositive ? 'bg-[#8ea97a] text-[#1e1e1e]' : 'bg-none text-gray-350'}`}>
                          {tx.amountStr}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </>
        )}

        {currentScreen === 'accountDetail' && (
          <>
            <div className="px-4 py-3 flex items-center justify-between bg-[#121212] border-b border-transparent z-10">
              <button onClick={() => setCurrentScreen('home')} className="text-gray-300">
                <ArrowLeft className="w-6 h-6 cursor-pointer" />
              </button>
              <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-[#1c1c1e] border border-gray-700">
                <img src={logo} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="w-6"></div>
            </div>

            <div className="px-4 pb-4 pt-1 text-center bg-[#121212]">
              <h2 className="text-sm font-medium text-gray-300">Girokonto XTENSION über...</h2>
              <div className="text-2xl font-bold text-[#8ea97a] mt-1">{activeHeaderBalance}</div>
              <p className="text-[11px] text-gray-400 mt-0.5">Account balance on {activeHeaderDate}</p>
            </div>

            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-none"
            >
              
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs font-semibold text-gray-300">Shortcuts</span>
                <span className="text-xs text-[#0a84ff] font-medium cursor-pointer">Show all</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div onClick={() => setCurrentScreen('sendMoneyForm')} className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <ArrowUpRight className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Send Money</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <FileText className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Account details</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <Search className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Search transactions</span>
                </div>
                <div className="flex flex-col items-center space-y-1.5 cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#2c2c2e] flex items-center justify-center text-gray-100 shadow-inner">
                    <Clock className="w-6 h-6 text-gray-200" />
                  </div>
                  <span className="text-[11px] text-gray-300 leading-tight">Standing orders</span>
                </div>
              </div>

              {Object.entries(groupedTransactions).map(([dateKey, txList]) => (
                <div key={dateKey} className="space-y-2 pt-2">
                  <span className="text-xs font-semibold text-gray-300">{dateKey}</span>
                  <div className="bg-[#1c1c1e] rounded-xl overflow-hidden border border-[#2c2c2e] divide-y divide-[#2c2c2e]">
                    {txList.map((tx) => {
                      const globalIndex = evaluatedTransactions.findIndex(t => t.id === tx.id);
                      return (
                        <div 
                          key={tx.id}
                          ref={el => transactionItemRefs.current[globalIndex] = el}
                          onClick={() => openTransactionDetail(tx)}
                          className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528] transition-colors"
                        >
                          <div className="flex items-start space-x-3 pr-2">
                            {renderTransactionIcon(tx.name)}
                            <div>
                              <p className="font-semibold text-gray-200 text-xs truncate max-w-[210px]">{tx.name}</p>
                              <p className="text-[10px] text-gray-400 truncate max-w-[210px]">{tx.reference}</p>
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-xl font-bold text-xs tracking-tight whitespace-nowrap shadow-sm ${tx.isPositive ? 'bg-[#8ea97a] text-[#1e1e1e]' : 'bg-none text-gray-100'}`}>
                            {tx.amountStr}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

            </div>
          </>
        )}

        {/* Money Transfer Flow - Step 1: Input Form */}
        {currentScreen === 'sendMoneyForm' && (
          <div className="flex-1 flex flex-col justify-between bg-[#121212]">
            <div className="px-4 py-3 flex items-center justify-between border-b border-[#2c2c2e]">
              <button onClick={() => setCurrentScreen('home')} className="text-gray-300">
                <ArrowLeft className="w-6 h-6 cursor-pointer" />
              </button>
              <h2 className="text-sm font-semibold text-gray-200">New Transfer</h2>
              <div className="w-6"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Recipient Name</label>
                <input 
                  type="text"
                  value={transferForm.recipient}
                  onChange={(e) => setTransferForm({...transferForm, recipient: e.target.value})}
                  placeholder="e.g. Max Mustermann"
                  className="w-full bg-[#1c1c1e] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">IBAN</label>
                <input 
                  type="text"
                  value={transferForm.iban}
                  onChange={(e) => setTransferForm({...transferForm, iban: e.target.value})}
                  placeholder="DE89 3704 ......"
                  className="w-full bg-[#1c1c1e] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-red-600 tracking-wider"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Amount (€)</label>
                <input 
                  type="text"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm({...transferForm, amount: e.target.value})}
                  placeholder="0,00"
                  className="w-full bg-[#1c1c1e] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-red-600 font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-400">Reference / Purpose</label>
                <input 
                  type="text"
                  value={transferForm.reference}
                  onChange={(e) => setTransferForm({...transferForm, reference: e.target.value})}
                  placeholder="e.g. Rent, Invoice #123"
                  className="w-full bg-[#1c1c1e] border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-red-600"
                />
              </div>

              {transferError && (
                <p className="text-xs text-red-500 font-medium text-center">{transferError}</p>
              )}
            </div>

            <div className="p-5 border-t border-[#2c2c2e]">
              <button 
                onClick={handleTransferSubmit}
                className="w-full bg-[#e30613] hover:bg-red-700 text-white font-bold py-3.5 rounded-full text-sm shadow-md transition-colors"
              >
                Continue to Review
              </button>
            </div>
          </div>
        )}

        {/* Money Transfer Flow - Step 2: Review Screen */}
        {currentScreen === 'sendMoneyReview' && (
          <div className="flex-1 flex flex-col justify-between bg-[#121212]">
            <div className="px-4 py-3 flex items-center justify-between border-b border-[#2c2c2e]">
              <button onClick={() => setCurrentScreen('sendMoneyForm')} className="text-gray-300">
                <ArrowLeft className="w-6 h-6 cursor-pointer" />
              </button>
              <h2 className="text-sm font-semibold text-gray-200">Review Transfer</h2>
              <div className="w-6"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="bg-[#1c1c1e] border border-gray-700 rounded-2xl p-4 space-y-3">
                <div className="flex items-center space-x-2 text-[#54aeff]">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-semibold">SEPA Credit Transfer Details</span>
                </div>
                <div className="divide-y divide-[#2c2c2e] text-xs space-y-2 pt-2">
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">Recipient</span>
                    <span className="font-semibold text-gray-100">{transferForm.recipient}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">IBAN</span>
                    <span className="font-semibold text-gray-100 tracking-wider">{transferForm.iban}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">Amount</span>
                    <span className="font-bold text-[#8ea97a] text-sm">{transferForm.amount} €</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-gray-400">Reference</span>
                    <span className="font-semibold text-gray-100">{transferForm.reference || '-'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#2c2c2e]">
              <button 
                onClick={handleExecuteTransfer}
                className="w-full bg-[#34c759] hover:bg-green-600 text-white font-bold py-3.5 rounded-full text-sm shadow-md transition-colors"
              >
                Execute Transfer (App-TAN)
              </button>
            </div>
          </div>
        )}

        {/* Money Transfer Flow - Step 3: Success Screen */}
        {currentScreen === 'sendMoneySuccess' && (
          <div className="flex-1 flex flex-col justify-between items-center text-center px-6 py-12 bg-[#121212]">
            <div className="space-y-4 pt-12">
              <div className="w-20 h-20 bg-[#34c759]/20 border border-[#34c759] rounded-full flex items-center justify-center mx-auto text-[#34c759]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-lg font-bold text-gray-100">Transfer Executed Successfully</h2>
              <p className="text-xs text-gray-400 max-w-[280px] mx-auto">
                Your payment has been securely submitted and recorded in your live transaction history.
              </p>
            </div>

            <div className="w-full space-y-3 pb-6">
              <button 
                onClick={() => {
                  setTransferForm({ recipient: '', iban: '', amount: '', reference: '' });
                  setCurrentScreen('home');
                }}
                className="w-full bg-[#e30613] hover:bg-red-700 text-white font-bold py-3.5 rounded-full text-sm shadow-md transition-colors"
              >
                Back to Start
              </button>
            </div>
          </div>
        )}

        {currentScreen === 'transactionDetail' && selectedTransaction && (
          <>
            <div className="px-4 py-3 flex items-center justify-between bg-[#121212] border-b border-transparent z-10">
              <button onClick={() => setCurrentScreen('accountDetail')} className="text-gray-300">
                <ArrowLeft className="w-6 h-6 cursor-pointer" />
              </button>
              <h2 className="text-sm font-semibold text-gray-200">Transaction details</h2>
              <div className="w-6"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4 scrollbar-none">
              
              <div className="bg-[#1c1c1e] border border-[#2c2c2e] rounded-2xl p-4 flex flex-col space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {renderTransactionIcon(selectedTransaction.name)}
                  </div>
                  <div className="flex-1 pr-2">
                    <h3 className="text-sm font-bold text-gray-100 leading-snug">{selectedTransaction.shortName}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{selectedTransaction.reference}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold tracking-tight ${selectedTransaction.isPositive ? 'text-[#8ea97a]' : 'text-gray-100'}`}>
                    {selectedTransaction.amountStr}
                  </span>
                </div>
              </div>

              <div className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">Posting date</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5">{selectedTransaction.postingDate}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">Value date</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5">{selectedTransaction.valueDate}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">Name</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5">{selectedTransaction.name}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">Reference</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5">{selectedTransaction.reference}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">IBAN</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5 tracking-wider">{selectedTransaction.iban}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e]">
                  <p className="text-[10px] text-gray-400">BIC</p>
                  <p className="text-xs font-semibold text-gray-200 mt-0.5 tracking-wider">{selectedTransaction.bic}</p>
                </div>
                <div className="px-4 py-3 border-b border-[#2c2c2e] flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400">Category</p>
                    <p className="text-xs font-semibold text-gray-200 mt-0.5">{selectedTransaction.category}</p>
                  </div>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
                <div className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400">Tags</p>
                    <p className="text-xs font-semibold text-gray-200 mt-0.5">Unassigned</p>
                  </div>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>
              </div>

              <div className="bg-[#54aeff]/25 border border-[#54aeff]/50 rounded-2xl p-4 space-y-2">
                <div className="flex space-x-2 items-start text-[#54aeff]">
                  <HelpCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-100 leading-relaxed">
                    With the financial planner, you can assign categories and keywords to transactions, split the transaction amount as well as add notes and files (e.g., photos).
                  </p>
                </div>
                <button className="text-xs text-[#54aeff] font-semibold pl-6 block hover:underline">
                  Activate the financial planner for free
                </button>
              </div>

              <div className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] overflow-hidden">
                <div 
                  onClick={() => setAdditionalInfoExpanded(!additionalInfoExpanded)}
                  className="px-4 py-3.5 flex justify-between items-center cursor-pointer"
                >
                  <span className="text-xs font-bold text-gray-100">Additional information</span>
                  {additionalInfoExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
                {additionalInfoExpanded && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-400 border-t border-[#2c2c2e]">
                    <p>Booking Type: SEPA Credit Transfer</p>
                    <p className="mt-1">Computed Balance After: {selectedTransaction.formattedBalance}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-1">
                <span className="text-xs font-semibold text-gray-300">Actions</span>
                <div className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] overflow-hidden divide-y divide-[#2c2c2e]">
                  <div className="px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528]">
                    <div className="flex items-center space-x-3 text-xs text-gray-200">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">Create template</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-400 rotate-45" />
                  </div>
                  <div className="px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528]">
                    <div className="flex items-center space-x-3 text-xs text-gray-200">
                      <Scissors className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">Split amount</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#54aeff]"></span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <span className="text-xs font-semibold text-gray-300">Notes</span>
                <div className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] overflow-hidden">
                  <div className="px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528]">
                    <div className="flex items-center space-x-3 text-xs text-gray-200">
                      <Edit3 className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">Add note</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#54aeff]"></span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-1 pb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-300">Files</span>
                  <span className="text-[11px] text-gray-400">0 of 5 files</span>
                </div>
                <div className="bg-[#1c1c1e] rounded-2xl border border-[#2c2c2e] overflow-hidden divide-y divide-[#2c2c2e]">
                  <div className="px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528]">
                    <div className="flex items-center space-x-3 text-xs text-gray-200">
                      <Camera className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">Upload file</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#54aeff]"></span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="px-4 py-3.5 flex justify-between items-center cursor-pointer hover:bg-[#252528]">
                    <div className="flex items-center space-x-3 text-xs text-gray-200">
                      <Camera className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold">Upload photo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#54aeff]"></span>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </>
        )}

        {currentScreen !== 'pinLogin' && (
          <div className="bg-[#1c1c1e] border-t border-[#2c2c2e] pt-2 pb-6 px-8 flex justify-between items-center z-20">
            <button 
              onClick={() => { setActiveTab('Start'); setCurrentScreen('home'); }}
              className={`flex flex-col items-center space-y-1 ${activeTab === 'Start' ? 'text-white' : 'text-gray-400'}`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px]">Start</span>
            </button>
            <button 
              onClick={() => setActiveTab('Products')}
              className={`flex flex-col items-center space-y-1 relative ${activeTab === 'Products' ? 'text-white' : 'text-gray-400'}`}
            >
              <Box className="w-5 h-5" />
              <span className="text-[10px]">Products</span>
              <span className="absolute top-0 right-1.5 w-1.5 h-1.5 bg-[#54aeff] rounded-full"></span>
            </button>
            <button 
              onClick={() => setActiveTab('Services')}
              className={`flex flex-col items-center space-y-1 ${activeTab === 'Services' ? 'text-white' : 'text-gray-400'}`}
            >
              <Star className="w-5 h-5" />
              <span className="text-[10px]">Services</span>
            </button>
            <button 
              onClick={() => setActiveTab('Profile')}
              className={`flex flex-col items-center space-y-1 relative ${activeTab === 'Profile' ? 'text-white' : 'text-gray-400'}`}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
              <span className="absolute top-0 right-1.5 w-1.5 h-1.5 bg-[#54aeff] rounded-full"></span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}