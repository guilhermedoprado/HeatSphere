using System;
using System.Collections.Generic;
using System.Text;

using HeatSphere.Domain.Common;

namespace HeatSphere.Domain.Common;

public sealed record TerminalTemperatures(
    Temperature ThIn,
    Temperature ThOut,
    Temperature TcIn,
    Temperature TcOut);

