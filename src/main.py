import lib.sopare.sopare

def create_config(cfg_ini, endless_loop, debug, plot, wave, outfile, infile, dict, error):
    if (cfg_ini == None):
        cfg = sopare.config.config()
    else:
        cfg = sopare.config.config(cfg_ini)
    logger = sopare.log.log(debug, error, cfg)
    cfg.addsection('cmdlopt')
    cfg.setoption('cmdlopt', 'endless_loop', str(endless_loop))
    cfg.setoption('cmdlopt', 'debug', str(debug))
    cfg.setoption('cmdlopt', 'plot', str(plot))
    cfg.setoption('cmdlopt', 'wave', str(wave))
    cfg.setoption('cmdlopt', 'outfile', outfile)
    cfg.setoption('cmdlopt', 'infile', infile)
    cfg.setoption('cmdlopt', 'dict', dict)
    cfg.addlogger(logger)
    return cfg

def main():
    sopare.main()

if __name__ == "__main__":
    main()
